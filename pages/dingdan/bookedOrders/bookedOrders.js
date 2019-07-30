// pages/bookedOrders/bookedOrders.js
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderLists:[]
  },
  cancelOrder:function(e){
    console.log(e.currentTarget.dataset.orderId)

  },
  cancelOrder:function(e){
    console.log(e.currentTarget.dataset.orderId)
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    http.$request(api.Cancel_Order, {orderId:e.currentTarget.dataset.orderId}, 'POST').then(function (res) {
      wx.hideLoading();
      _this.getOrderLists();
    })

  },
  goDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: "/pages/dingdan/appointOrderDetail/appointOrderDetail?orderId="+e.currentTarget.dataset.orderId
    });
  },
  getOrderLists:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    http.$request(api.queryMyOrder, { orderStatusType: 1 }, 'POST').then(function (res) {
      console.log(res)
      wx.hideLoading();
      _this.setData({
        orderLists: res.data
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
    this.getOrderLists();
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