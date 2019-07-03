// pages/productCenter/productCenter.js
const http = require('../../../utils/http.js');
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    currentCategoryId: '',
    categoryList: [],
    currentSubCategoryList: {},
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  switchRightTab: function(e) {
    let id = e.target.dataset.id;
    this.setData({
      currentCategoryId: id
    })
    this.getCurrentCategory(id);
  },
  goDetail:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/productLists/productLists?id='+e.currentTarget.dataset.id,
    })
  },
  getDetail:function(){
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    http.$request(api.CatalogList).then(function(res){
      wx.hideLoading();
       if(res.errno == '0'){
         _this.setData({
           categoryList: res.data.categoryList,
           currentCategoryId: res.data.currentCategory.id,
           currentSubCategoryList:res.data.currentSubCategoryList
         })
       }
    })
  },
  getCurrentCategory: function (id){
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    http.$request(api.CatalogList, {categoryId:id}).then(function (res) {
      wx.hideLoading();
      if (res.errno == '0') {
        _this.setData({
          
          currentCategoryId: res.data.currentCategory.id,
          currentSubCategoryList: res.data.currentSubCategoryList
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail();
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