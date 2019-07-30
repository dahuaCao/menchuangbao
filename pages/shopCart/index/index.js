// pages/gouwu/gouwu.js
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAllStatus: false, // 全选状态，默认全选
    cartLists:{},
    checkCount:0,
    checkIds:[]
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      checkCount: e.detail.value.length,
      checkIds: e.detail.value
    })
  },
  myClick:function(e){
   
    let cartId = e.currentTarget.dataset.id;
    let arrs = this.data.items;
    let _this = this;
    console.log(cartId)
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除此件商品吗?',
      confirmText: '确定',
      confirmColor: '#FF0000',
      cancelText: '取消',
      cancelColor: '#333',
      success:  (res) => {
        console.log(res)
        if(res.confirm){
          wx.showLoading({
            title: '加载中',
          })
          http.$request(api.CartDelete, {cartId:cartId}).then(function (res) {
            wx.hideLoading();
            if(res.errno == '0'){
                _this.getDetail();
            }
          })
        }
      }
    })
  },
  goDetail:function(){
    console.log('跳转详情页面')
  },
  selectAll:function(){
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    let list = this.data.cartLists;
    let checkIds = [];
    list.cartList.forEach(function(item){
      item.checked = !selectAllStatus;
      if (selectAllStatus){
        checkIds.push(item.id)
      }
    })
    console.log(list)
    // 页面重新渲染
    let count = selectAllStatus ? list.cartList.length : 0;
    console.log(checkIds)
    console.log(selectAllStatus)
    this.setData({
      selectAllStatus,
      cartLists:list,
      checkCount:count,
      checkIds
    });
    
  },
  getDetail:function(){
    const _this = this;
    wx.showLoading({
      title: '加载中',
    })
    http.$request(api.CartLists).then(function(res) {
      wx.hideLoading();
        _this.setData({
          cartLists:res.data
        })
    })
  },
  AppointOrder:function(){
    let checkIds = this.data.checkIds;
    if (checkIds.length < 1){
      wx.showToast({
        image: '/images/icon_error.png',
        title: '请选择宝贝'
      });
      return;
    }
    let params = checkIds.join(',');
    console.log(params)
    wx.navigateTo({
      url: '/pages/shopCart/applyOrders/applyOrders?parms=' + encodeURI(params),
    })
    // http.$request(api.AppointOrders,{ids:params}).then(function(res){
    //   if(res.errno == '0'){
    //     console.log(res.data)
    //     wx.setStorageSync( 'goodLists',res.data)
    //     wx.navigateTo({
    //       url: '/pages/shopCart/applyOrders/applyOrders',
    //     })
    //   }
    // })
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
    this.getDetail();
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