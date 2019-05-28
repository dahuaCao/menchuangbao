//app.js
var QQMapWX = require('utils/libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;


App({
  onLaunch: function () {
  
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getLocation:function(){
    qqmapsdk = new QQMapWX({
      //此key需要用户自己申请
      key: 'HPZBZ-ERACI-5VEG2-5YTBO-AX723-DCBCV'
    });
    var that = this;
    // 调用接口
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          resolve(res)
          that.globalData.location = res.result.address_component.city;
        },
        fail: function (res) {
          that.globalData.location = '定位失败';
          reject('定位失败')
        },
        complete: function (res) {

        }
      });
    })
   
  },
  globalData: {
    userInfo: null,
    
  }
})