// pages/erweima/erweima.js

import QRCode from '../../../utils/libs/qrCode.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openShare: false,
    imageUrl:'',
    userId:''
  },
  shareFriendOrCircle: function () {
    //var that = this;
    if (this.data.openShare === false) {
      this.setData({
        openShare: !this.data.openShare
      });
    } else {
      return false;
    }
  },
  closeShare: function () {
    this.setData({
      openShare: false,
    });
  },
  saveShare:function(){
    let _this = this;
    this.canvasToTempImage(_this.downloadIImg);
  },
  canvasToTempImage:function(callBack){
    let _this = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        callBack&& callBack(res.tempFilePath)
        _this.setData({
          openShare: false,
          imageUrl: res.tempFilePath
        });
      },
      fail: function (res) {
        console.log(res);
        _this.setData({
          openShare: false,
        });
      }
    });
    

  },
  downloadIImg:function(url){
    let that = this;
    console.log(url)
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success() {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，可以分享到朋友圈了',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#a78845',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      },
      fail() {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId;
    console.log(userId)
    this.setData({
      userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.canvasToTempImage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var qrcode = new QRCode('canvas', {
      text: 'https://www.hbjlzn.com/xcx/test?userId=' + app.globalData.userId,
      width: 180,
      height: 180,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.correctLevel.H
    });
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '微信二维码分享',
      desc: '唯爱与美食不可辜负',
      path: '/pages/login/login?userId=' + app.globalData.userId,
      imageUrl: that.data.imageUrl,
    }
    this.closeShare();
  }
})