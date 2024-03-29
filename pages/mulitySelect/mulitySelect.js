// pages/mulitySelect/mulitySelect.js
let provinceData = require("../../common/province.js").provinceData;
// let Data = provinceData.provinceData;
let Provincial = [],
  urban = [],
  areas = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [],
    multiIndex: [0,0,0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     Provincial  = provinceData.map(function(item){
      return item.name
    })
     urban = provinceData[0].city.map(function(item){
      return item.name
    })
     areas = provinceData[0].city[0].area;
    this.setData({ multiArray: [Provincial, urban, areas]}) 
  },
  bindMultiPickerColumnChange:function(e){
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column){
      case 0:
        console.log(provinceData[e.detail.value])
        var myArr = provinceData[e.detail.value].city.map(function (item) {
          return item.name
        })
        data.multiArray[1] = provinceData[e.detail.value].city.map(function (item) {
          return item.name
        })
        console.log(myArr)
        data.multiArray[2] = provinceData[e.detail.value].city[0].area;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = provinceData[data.multiIndex[0]].city[e.detail.value].area;
        data.multiIndex[2] = 0;
        break;       
    }
    this.setData(data)
  },
  bindMultiPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})