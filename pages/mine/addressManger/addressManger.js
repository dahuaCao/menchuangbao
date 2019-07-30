// pages/addressManger/addressManger.js
const http = require('../../../utils/http.js');

const api = require('../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[1,2,3],
    addressLists:[]
  },
  address: function (event){
    //返回之前，先取出上一页对象，并设置addressId
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(prevPage.route)
    if (prevPage.route == "pages/shopCart/applyOrders/applyOrders"){
      try {
        wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
      } catch (e) {

      }
      wx.navigateBack();
    }
  },
  goAddress:function(){
    wx.navigateTo({
      url: "/pages/mine/addAddress/addAddress"
    });
  },
  addressUpdate: function (event){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(prevPage)
    console.log(pages)
    let addressId = event.currentTarget.dataset.addressId;
    wx.navigateTo({
      url: '/pages/mine/addAddress/addAddress?id=' + addressId
    })
  },
  getAddressList:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    http.$request(api.AddressList,{},'POST').then(function(res){
      wx.hideLoading();
      
      _this.setData({
        addressLists:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getAddressList();
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