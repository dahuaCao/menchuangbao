// pages/unpaidFixDetail/unpaidFixDetail.js
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    char_lt: "<",
    lists: [1, 2, 34, 5],
    paid: false
  },
  pay(){
    console.log(123)
    http.$request(api.prePya, {
      orderId: "201907190633154834"
    }, 'POST').then(function (res) {

      wx.requestPayment({
        timeStamp: res.data['timeStamp'],
        nonceStr: res.data['nonceStr'],
        package: res.data['packageValue'],
        signType: 'MD5',
        paySign: res.data['paySign'],
        'success': function (successret) {
          console.log('支付成功');
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.paid) {
      this.setData({
        paid: options.paid
      })
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