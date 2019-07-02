// pages/feedBack/feedBack.js
const utils = require('../../../utils/util.js');
const http = require('../../../utils/http.js');
const api = require('../../../config/api.js');
let _lastTime = 0;
let phoneTest = /^1[3|4|5|7|8][0-9]{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '安装建议', checked: 'true' },
      { name: '2', value: '售后服务',  },
      { name: '3', value: '问题反馈' }
    ],
    
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindFormSubmit(e) {
    const _this = this;
    console.log(e);
    const dataObj = e.detail.value;
    if (!dataObj.details){
      wx.showToast({
        title: '请输入具体情况文字描述',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!dataObj.name) {
      wx.showToast({
        title: '请输入正确联系人姓名!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!dataObj.mobile || !phoneTest.test(dataObj.mobile) ) {
      wx.showToast({
        title: '请输入正确的电话号码 !',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let _nowTime = + new Date();
    if (_nowTime - _lastTime > 1000){
      http.$request(api.suggestSubmit,dataObj,'POST').then(function(res){
        if(res.errno == '0'){
          wx.showToast({
            title: '建议提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/mine/feedBack/feedBack'
            });  
          },2000)    
        }
      })
      _lastTime = _nowTime
    }

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
    if (getCurrentPages().length != 0) {
      console.log('进来了')
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
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