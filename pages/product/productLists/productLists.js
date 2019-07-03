// pages/productDetail/productDetail.js
const http = require('../../../utils/http.js');
const api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  getList:function(id){
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    http.$request(api.CatalogCurrent, {categoryId:id}).then(function (res) {
      wx.hideLoading();
      if (res.errno == '0') {
        _this.setData({
          dataList:res.data.records
        })
      }
    })
  },
  goDetail:function(event){
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/productDetail/productDetail?id=' + event.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getList(options.id);
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