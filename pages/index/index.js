//index.js
//获取应用实例
const app = getApp();
const http = require('../../utils/http.js');
const utils = require('../../utils/util.js');
const api = require('../../config/api.js')

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
    adList:'',
    imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560768892900&di=3270d9380d0962634d212f098609bbc3&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg',
    topServiceImgs:[],
    dataObj:{}

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
      url: "/pages/product/productCenter/productCenter"
    });
  },
  goProduct:function(){
    wx.navigateTo({
      url: "/pages/productCenter/productCenter"
    });
  },
  repairApply:function(e){
    const index = e.currentTarget.dataset.index;
    const PageArr = ["/pages/repairApplication/repairApplication", "/pages/product/productCenter/productCenter"];
    wx.navigateTo({
      url: PageArr[index]
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
    var _this = this;
    http.$request(api.HomePictrue, {},'POST').then(function(res){
      console.log(res.data.top)
      /**
       * abovefloor 员工
       * floor  底部产品广告
       * top    顶部广告位
      */
      _this.setData({
        topServiceImgs: res.data.top,
        dataObj: res.data
      })
    })
  }
});
