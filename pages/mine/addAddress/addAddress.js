// pages/addAddress/addAddress.js
const http = require('../../../utils/http.js');
const check = require('../../../utils/check.js');
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js')
let Provincial = [],
  urban = [],
  areas = [],
  provinceData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 60,
    isChecked: false,
    multiArray: [],
    multiIndex: [0, 0, 0],
    address: {
      name: '',
      mobile: '',
      address: '',
      provinceName:'',
      cityName:'',
      areaName:'',
      provinceId:'',
      cityId: '',
      areaId:''
    },
    addressId: '',
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.mobile = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.name = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault: function() {
    const isCheck = this.data.isChecked;
    this.setData({
      isChecked: !isCheck
    })
  },
  getRegion: function() {
    let _this = this;
    http.$request(api.GetRegionList, {}, 'POST').then(function(res) {
      provinceData = res.data;
      Provincial = provinceData.map(function(item) {
        return {
          "id": item.provinceId,
          "name": item.provinceName
        }
      })
      urban = provinceData[0].cityList.map(function(item) {
        return {
          "id": item.cityId,
          "name": item.cityName
        }
      })
      areas = provinceData[0].cityList[0].areaList.map(function(item) {
        return {
          "id": item.areaId,
          "name": item.areaName
        }
      });
      _this.setData({
        multiArray: [Provincial, urban, areas]
      })
      console.log(_this.data.multiArray)
    })
  },
  getAddressDetail:function(id){
     const _this = this;
     http.$request(api.AddressDetail,{id:id},'POST').then(function(res){
        let address = {
          name: res.data.name,
          mobile:res.data.mobile,
          address: res.data.address,
          provinceName: res.data.provinceName,
          cityName: res.data.cityName,
          areaName: res.data.areaName,
          provinceId: res.data.provinceId,
          cityId: res.data.cityId,
          areaId: res.data.areaId
        }
        _this.setData({
          address:address,
          isChecked: res.data.isDefault == '1'? false :true
        })
     })
  },
  bindMultiPickerColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    console.log(e)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        console.log(provinceData[e.detail.value])
        data.multiArray[1] = provinceData[e.detail.value].cityList.map(function(item) {
          return {
            "id": item.cityId,
            "name": item.cityName
          }
        })
        data.multiArray[2] = provinceData[e.detail.value].cityList[0].areaList.map(function(item) {
          return {
            "id": item.areaId,
            "name": item.areaName
          }
        });
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = provinceData[data.multiIndex[0]].cityList[e.detail.value].areaList.map(function(item) {
          return {
            "id": item.areaId,
            "name": item.areaName
          }
        });
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data)
  },
  bindMultiPickerChange: function(e) {
    const regionArr = this.data.multiArray;
    let address = this.data.address;
    address.provinceName = regionArr[0][e.detail.value[0]].name;
    address.cityName = regionArr[1][e.detail.value[1]].name;
    address.areaName = regionArr[2][e.detail.value[2]].name;
    address.provinceId=regionArr[0][e.detail.value[0]].id;
    address.cityId=regionArr[1][e.detail.value[1]].id;
    address.areaId= regionArr[2][e.detail.value[2]].id;
    this.setData({
      address
    })
  },
  cancelAddress() {
    wx.navigateBack();
  },
  saveAddress() {
    let address = this.data.address;
    if (address.name == '') {
      util.showErrorToast('请输入姓名');
      return false;
    }
    if (address.mobile == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    if (!address.provinceId) {
      util.showErrorToast('请输入省市区');
      return false;
    }
    if (address.address == '') {
      util.showErrorToast('请输入详细地址');
      return false;
    }

    if (!check.isValidPhone(address.mobile)) {
      util.showErrorToast('手机号不正确');
      return false;
    }
    let isDefault = this.data.isChecked ? '0' : '1', dataObj;
    if(this.data.addressId){
      dataObj = Object.assign({}, this.data.address, { isDefault: isDefault, id:this.data.addressId });
    }else{
     dataObj = Object.assign({}, this.data.address, { isDefault: isDefault });
    }
   
    let url = this.data.addressId ? api.AddressUpdate : api.AddressSave;
    http.$request(url,dataObj,'POST').then(function(res){
      if(res.errno == '0'){
        wx.navigateBack();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRegion();
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail(options.id);
    }
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})