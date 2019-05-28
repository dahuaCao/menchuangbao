//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    swiperObj: {
      autoplay: true,
      indicatorDots: true,
      circular: true,
      interval: 3000,
      duration: 300
    },
    location:'定位中...'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  goPage:function(e){
    const pageArr = ["/pages/expressOrder/expressOrder", "/pages/staffStyle/staffStyle", "/pages/productNews/productNews"]
    const index = e.currentTarget.dataset.index;
    console.log(index)
    wx.navigateTo({
      url: pageArr[index]
    });
  },
  goLocation:function(){
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  goProduct:function(){
    wx.navigateTo({
      url: "/pages/productCenter/productCenter"
    });
  },
  repairApply:function(){
    wx.navigateTo({
      url: "/pages/repairApplication/repairApplication"
    });
  },
  onLoad: function (options) {
    var that = this;
    if (app.globalData.location){
      that.setData({
        location: app.globalData.location
      })
    }else{
      app.getLocation().then(function (res) {
        that.setData({
          location: app.globalData.location
        })
      })
    }
    
    
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
