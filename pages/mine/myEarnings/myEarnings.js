// pages/myEarnings/myEarnings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[2,4,6,73,54,3,6,5],
    scroll_height:0
  },
  loadMore:function(){
    console.log("数据加载")
  },
  applyCash:function(){
    console.log(1232)
    wx.navigateTo({
      url: '/pages/mine/cashApplication/cashApplication',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 610
    })
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
    console.log("下拉")  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})