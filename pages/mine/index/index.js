// pages/my/my.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  lianjie:function(){
    console.log('打印信息')
    wx.navigateTo({
      url: "/pages/mine/erweima/erweima"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo){
      console.log('获取个人信息成功')
      this.setData({userInfo})
    }
  
    console.log(this.data.userInfo)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})