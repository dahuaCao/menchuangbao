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
      addressName:'点击选择',
      detailAddress:'',
      longitude:'',
      latitude:'',
      doorplate:''
      
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
    address.doorplate = event.detail.value;
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
  getAddressDetail:function(id){
     const _this = this;
     http.$request(api.AddressDetail,{id:id},'POST').then(function(res){
        let address = {
          name: res.data.name,
          mobile:res.data.mobile,
          addressName: res.data.addressName,
          doorplate: res.data.doorplate
        }
        _this.setData({
          address:address,
          isChecked: res.data.isDefault == '1'? false :true
        })
     })
  },
  chooseAddress:function(){
    const _this = this;
    let address = this.data.address;
    wx.chooseLocation({
      success: function (res) {
        address.addressName = res.name;
        address.detailAddress = res.address;
        address.latitude = res.latitude;
        address.longitude = res.longitude;
        console.log(res);
        //选择地点之后返回到原来页面
        _this.setData({
          address
        });

      },
      fail: function (err) {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '位置信息授权',
                content: '位置授权暂未开启，无法完成签到',
                confirmText: '开启授权',
                confirmColor: '#345391',
                cancelText: '仍然拒绝',
                cancelColor: '#999999',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      fail: function () {
                        console.log('openSetting.failed')
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '签到失败',
                      content: '无法使用定位权限，签到失败',
                      confirmText: '太遗憾了',
                      confirmColor: '#345391',
                      showCancel: false
                    })
                  }

                }
              })
            }
          }
        })

      },
      complete: function () {
        console.log(123)
      },
      cancel: function () {

      }
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
    if (address.receipt == '点击选择'　) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    if (address.doorplate == '') {
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