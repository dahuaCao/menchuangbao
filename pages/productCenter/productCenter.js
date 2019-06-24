// pages/productCenter/productCenter.js
const http = require('../../utils/http.js');
const api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    navLeftItems: [{
      id: 1,
      desc: '铝合金门窗'
    }, {
      id: 2,
      desc: '塑钢窗'
    }, {
      id: 3,
      desc: '玻璃门'
    }, {
      id: 4,
      desc: '木门'
    }, {
      id: 5,
      desc: '铝合金门'
    }],
    navRightItems: [{
      desc: "推拉窗",
      src: "http://temp.im/250x235"
    }, {
      desc: "平开窗",
      src: "http://temp.im/250x235"
    }, {
      desc: "日光浴",
      src: "http://temp.im/250x235"
    }, {
      desc: "开天窗",
      src: "http://temp.im/250x235"
    }, {
      desc: "好日子",
      src: "http://temp.im/250x235"
    }, {
      desc: "推拉窗",
      src: "http://temp.im/250x235"
      }, {
        desc: "推拉窗",
        src: "http://temp.im/250x235"
      }, {
        desc: "平开窗",
        src: "http://temp.im/250x235"
      }, {
        desc: "日光浴",
        src: "http://temp.im/250x235"
      }, {
        desc: "开天窗",
        src: "http://temp.im/250x235"
      }, {
        desc: "好日子",
        src: "http://temp.im/250x235"
      }],
    curNav: 1
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
      curNav: id
    })
  },
  goDetail:function(){
    wx.navigateTo({
      url: '../productDetail/productDetail',
    })
  },
  getDetail:function(){
    http.$request(api.productCenter,{},'POST').then(function(){

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