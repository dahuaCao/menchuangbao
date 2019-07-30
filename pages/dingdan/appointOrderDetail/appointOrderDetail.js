// pages/appointOrderDetail/appointOrderDetail.js
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    masterInfo:{},
    orderInfo:{}
  },
  getDetail:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
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
    let _this = this;
    console.log(_this.data.orderId)
    http.$request(api.Query_OrderDetail, {orderId:_this.data.orderId},'POST').then(function(res){
      _this.setData({
        masterInfo: res.data.erectorInfo,
        orderInfo: res.data.orderInfo
      })
    })

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