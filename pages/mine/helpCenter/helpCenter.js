
const http = require('../../../utils/http.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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

  },
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    const article = this.data.lists[index].content;
    this.setData({
      status: index,  
    });
    this.renderHtml(article,this);
  },
  getList:function(){
    var _this = this;
    http.$request(api.HelpCenterList,{},'POST').then(function(res){
      _this.setData({
        lists:res.data.list
      })
      const article = res.data.list[0].content;
      _this.renderHtml(article,_this);
        
    })
  },
  renderHtml:function(content,bind){
    const article = content;
    WxParse.wxParse('article', 'html', article, bind, 5);
  }
})