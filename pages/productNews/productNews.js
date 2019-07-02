// pages/productNews/productNews.js
const http = require('../../utils/http.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    pagenum: 1, //初始页默认值为1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews();
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
    console.log(3435353)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pages = this.data.pages;
    let pagenum = this.data.pagenum; //获取当前页数并+1
    if (pagenum - pages >= 0){
      
      return;
    }else{
      this.setData({
        pagenum: pagenum + 1 //获取当前页数并+1
      })
      this.getNews();
    }
  
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNews:function(){
    const _this = this;
    http.$request(api.newsCenterList, { pageNum: _this.data.pagenum},'POST').then(function(res){
      let  arr1 = _this.data.dataList;
      let arr2 = res.data.list;
      arr1 = arr1.concat(arr2);
      _this.setData({
        dataList: arr1,
        pages:res.data.pages
      })
      wx.stopPullDownRefresh(); //停止下拉刷新
      /*if(res.data.pages - page <= 0){
        wx.stopPullDownRefresh(); //停止下拉刷新
      }*/
    })
  }
})