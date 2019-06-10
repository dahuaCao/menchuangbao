// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judged:true, //是否评价
    artical:''
  },
  evaluation:function(){
    wx.navigateTo({
      url: "/pages/evaluations/evaluations"
    });
  },
  goDetail:function(e){
    const type = e.currentTarget.dataset.type;
    let url = '';
    switch(type){
      case '1':
        url = "/pages/complateFixDetail/complateFixDetail";
        break;
      case '2':
        url = "/pages/complateFixDetail/complateFixDetail?isFixd="+type;
        break;
    }
    wx.navigateTo({
      url: url
    });
  },
  bindLog:function(e){
    const type = e.currentTarget.dataset.type;
    let artical = '';
    switch(type){
      case '1':
        artical = '您好!感谢使用门窗宝平台,申请开票请下载门窗宝APP申请开票流程,如有疑问,请拨打客服热水400-8542-5755'
        break;
      case '2':
        artical = '您好!感谢使用门窗宝平台,投诉服务请下载门窗宝APP申请投诉,如有疑问,请拨打客服热水400-8542-5755'
        break;
      case '3':
        artical = '您好!感谢使用门窗宝平台,售后服务请下载门窗宝APP申请售后流程,如有疑问,请拨打客服热水400-8542-5755'
        break;
    }
    this.setData({
      artical: artical
    })
    this.dialog.showDialog();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      "title": "已完成订单"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
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