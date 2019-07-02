// pages/addressManger/addressManger.js
const http = require('../../../utils/http.js');

const api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[1,2,3],
    addressLists:[]
  },
  goAddress:function(){
    wx.navigateTo({
      url: "/pages/mine/addAddress/addAddress"
    });
  },
  addressUpdate: function (event){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(prevPage)
    console.log(pages)
    let addressId = event.currentTarget.dataset.addressId;
    wx.navigateTo({
      url: '/pages/mine/addAddress/addAddress?id=' + addressId
    })
  },
  radioChange:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.currentTarget.dataset.addressId;
          http.$request(api.AddressDelete, { id:addressId},'POST').then(function(res){
            if(res.errno == '0'){
              that.getAddressList();
            }
          })
          console.log('用户点击确定')
        }
      }
    })
    return false;

  },
  getAddressList:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    http.$request(api.AddressList,{},'POST').then(function(res){
      wx.hideLoading();
      _this.setData({
        addressLists:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddressList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})