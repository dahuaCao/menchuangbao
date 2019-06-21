// pages/login/login.js
const util = require('../../utils/util.js');
const user = require('../../utils/user.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    // if (e.detail.userInfo == undefined) {
    //   app.globalData.hasLogin = false;
    //   util.showErrorToast('微信登录失败');
    //   return;
    // }

    if (e.detail.userInfo) {
      user.checkLogin().then((res) =>{
        wx.switchTab({
          url: '/pages/index/index'
        })
      }).catch(() => {
        this.userLogin(e.detail.userInfo);

      });
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  userLogin:function(res){
    user.loginByWeixin(res).then(res => {
      app.globalData.hasLogin = true;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }).catch((err) => {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              _this.userLogin(res.userInfo);     
            }
          });
        }
      }
    })
  }
})