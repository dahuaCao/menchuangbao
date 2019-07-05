// pages/ceshi/ceshi.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var https = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'video'
  },
  play1:function(){
   
    
  },
  bindAdd:function(){
    this.dialog.showDialog();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(123)
    wx.openLocation({
      latitude: 32.04487,
      longitude: 112.13555,
      scale: 18
    })
   
	
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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