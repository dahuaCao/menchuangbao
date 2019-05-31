// pages/position/position.js

var QQMapWX = require('../../utils/libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'HPZBZ-ERACI-5VEG2-5YTBO-AX723-DCBCV'
    });

    this.moveToLocation();

  },
  //移动选点
  moveToLocation: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        //选择地点之后返回到原来页面
        wx.navigateTo({
          url: "/pages/expressOrder/expressOrder?address=" + res.name
        });

      },
      fail: function(err) {
        wx.getSetting({
          success: (res) => {
            console.log(res)
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '位置信息授权',
                content: '位置授权暂未开启，无法完成签到',
                confirmText: '开启授权',
                confirmColor: '#345391',
                cancelText: '仍然拒绝',
                cancelColor: '#999999',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      fail: function () {
                        console.log('openSetting.failed')
                      }
                    })
                  }else{
                    wx.showModal({
                      title: '签到失败',
                      content: '无法使用定位权限，签到失败',
                      confirmText: '太遗憾了',
                      confirmColor: '#345391',
                      showCancel: false
                    })
                  }
                  
                }
              })
            }
          }
        })
      
      },
      complete:function(){
        console.log(123)
      },
      cancel:function(){
        wx.navigateBack();
      }
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  }
})