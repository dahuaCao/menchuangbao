// pages/dingdan/dingdan.js
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coutLists:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   "title":"已完成订单"
    // })
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
    http.$request(api.aboutOrders,{},'POST').then(function(res){
      console.log(res)
      _this.setData({
        coutLists:res.data
      })
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})