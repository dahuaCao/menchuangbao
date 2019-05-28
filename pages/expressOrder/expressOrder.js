// pages/expressOrder/expressOrder.js
var QQMapWX = require('../../utils/libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "定位中..."
  },
  onChangeAddress: function(e) {
    wx.navigateTo({
      url: "/pages/position/position"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.address != null && options.address != '') {
      //设置变量 address 的值
      this.setData({
        address: options.address
      });
    } else {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        //此key需要用户自己申请
        key: 'HPZBZ-ERACI-5VEG2-5YTBO-AX723-DCBCV'
      });
      var that = this;
      // 调用接口
      qqmapsdk.reverseGeocoder({
        success: function(res) {
          console.log(res)
          that.setData({
            address: res.result.address
          });
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(res);
        }
      });
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