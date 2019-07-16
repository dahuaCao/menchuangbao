// pages/erweima/erweima.js

// const QRCode  = require('../../utils/libs/qrCode.js');
import QRCode from '../../../utils/libs/qrCode.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: '',//画布宽度
    canvasHeight: '',//画布高度 
    openShare: false,
    imageUrl:''
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
    this.canvasToTempImage();
  },
  canvasToTempImage:function(){
    let _this = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        console.log(res)
        var tempFilePath = res.tempFilePath;
        _this.downloadIImg(res.tempFilePath)
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
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        console.log("chenggong")
        that.setData({
          imageUrl: res.tempFilePath
        })
      },
      fail: function (res) {
        console.log("shibai")

      }
    });
    console.log(2)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var qrcode = new QRCode('canvas', {
      text: 'https://www.hbjlzn.com/xcx/test?userId=123',
      width: 180,
      height: 180,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.correctLevel.H
    });
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
    var that = this;
    console.log(this.data.imageUrl)
    return {
      title: '微信二维码分享',
      desc: '唯爱与美食不可辜负',
      path: '/pages/login/login?id=2',
      imageUrl: that.data.imageUrl,
    }
    this.closeShare();
  }
})