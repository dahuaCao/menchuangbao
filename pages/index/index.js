//index.js
//获取应用实例
const app = getApp();
const http = require('../../utils/http.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    swiperObj: {
      autoplay: true,
      indicatorDots: true,
      circular: true,
      interval: 3000,
      duration: 300
    },
    location:'定位中...',
    adList:''
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
  goSearch:function(){
    wx.navigateTo({
      url: "/pages/productCenter/productCenter"
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
  phoneCall:function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.replyPhone,
      success:function(){
        
      }
    })
  },
  onLoad: function (options) {
    this.getAd();
    var that = this;
    utils.getLocation(function(res){
      if(res.result){
        that.setData({
          location:res.result.address_component.city
        })
        console.log(res)
        app.globalData.locatInfo = res.result;
      }else{
        that.setData({
          location: res.result.address_component.city
        })
      }
    })  
  },
  getAd:function(){
    console.log('接口调用')
   /* http.$get('/productImg').then((res) => {
      console.log(res)
      this.setData({
        adList:res.data.imgArr
      })
    })*/
  }
});
