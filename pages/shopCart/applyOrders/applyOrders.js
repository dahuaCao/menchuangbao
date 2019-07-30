// pages/shopCart/applyOrders/applyOrders.js
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    lists:{}
  },
  addAddress:function(){
    wx.navigateTo({
      url: '/pages/mine/addressManger/addressManger',
    })

  },
  bookOrders:utils.throttle(function(){
      let addressId = this.data.lists.address_info.id;
      let parmObj;
      if (!addressId) {
        wx.showToast({
          image: '/images/icon_error.png',
          title: '请选择收货地址'
        });
        return;
      }
      wx.showLoading({
        title: '加载中',
      })
      if (this.data.ids) {
        parmObj = { cartId: 0, addressId: addressId };

      } else {
        let productId = this.data.lists.goodsBuy[0].specId;
        parmObj = { productId: productId, addressId: addressId };
      }
      http.$request(api.BookOrder, parmObj, 'POST').then(function (res) {
        wx.hideLoading();
        wx.navigateBack({
        })
      })
    
  },3000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.parms){
      this.setData({
        ids: decodeURI(options.parms)
      })
    }else{
      this.setData({
        speId: decodeURI(options.speId)
      })
    }
    
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
    let _this = this;
    var addressId = wx.getStorageSync('addressId') || '';
    if (this.data.ids){
      http.$request(api.AppointOrders, { ids: _this.data.ids, addressId: addressId }).then(function (res) {
        if (res.errno == '0') {
          _this.setData({
            lists: res.data
          })
        }
      })
    }else{
      http.$request(api.AppointOrders, {id: _this.data.speId, addressId: addressId }).then(function (res) {
        if (res.errno == '0') {
          _this.setData({
            lists: res.data
          })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})