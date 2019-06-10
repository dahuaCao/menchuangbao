// pages/unpaidOrders/unpaidOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goDetail:function(e){
    console.log(e)
    const type = e.currentTarget.dataset.type;
    let url = '';
    switch(type){
      case '1':
        url = '/pages/unpaidFixDetail/unpaidFixDetail'
        break;
      case '2':
        url = '/pages/unpaidRepairDetail/unpaidRepairDetail'
        break;
    }

    wx.navigateTo({
      url: url,
    })
  },
  pay:function(){
    wx.showModal({
      title: '温馨提示',
      content: '请再次确认测量面积与所填数据信息一致',
      confirmText: '确认',
      confirmColor: '#FF0000',
      cancelText: '取消',
      cancelColor: '#999999',
      success: function (res) {
        if (res.confirm) {
          
        }
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