//logs.js
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    logs: []
  },

  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onCitySelect(e){
    console.log(e)
    console.log(123)
    app.globalData.location = e.detail.city;
    wx.switchTab({
      url:  "/pages/index/index",
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }  
    })
    
  }
})
