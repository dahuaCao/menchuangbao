// pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["湖北省", "襄阳市", "襄城区"],
    height:60,
    isChecked:false
  },
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  vulueChange:function(e){
    console.log(e)
    if(e.detail.value){

    }
  },
  bindIsDefault:function(){
    console.log(1)
    console.log(this.data.isChecked)
    const isCheck = this.data.isChecked;
    
    this.setData({
      isChecked: !isCheck
    })
    console.log(this.data.isChecked)
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