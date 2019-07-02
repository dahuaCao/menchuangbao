// pages/expressOrder/expressOrder.js
var QQMapWX = require('../../utils/libs/qqmap-wx-jssdk.min.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "定位中..."
  },
  onChangeAddress: function(e) {
    // wx.navigateTo({
    //   url: "/pages/position/position"
    // });
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        //选择地点之后返回到原来页面
        _this.setData({
          address: res.name
        });

      },
      fail: function (err) {
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
                  } else {
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
      complete: function () {
        console.log(123)
      },
      cancel: function () {
       
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    if (getApp().globalData.locatInfo) {
      //设置变量 address 的值
      _this.setData({
        address: getApp().globalData.locatInfo.address
      });
    } else {
      utils.getLocation(function(res){
        if(res.result){
          _this.setData({
            address: res.result.address
          });
        }else{
          _this.setData({
            address: res
          });
        }
      })
    }
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

  }
})