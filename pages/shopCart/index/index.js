// pages/gouwu/gouwu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'USA', value: '美国' },
     
    ],
    selectAllStatus: true, // 全选状态，默认全选
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  myClick:function(e){
   
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.items;
    
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除此件商品吗?',
      confirmText: '确定',
      confirmColor: '#FF0000',
      cancelText: '取消',
      cancelColor: '#333',
      success:  (res) => {
        if (res.confirm) {
          arrs.splice(index,1)
          this.setData({
            items: arrs
          })
        } else {
          // wx.showModal({
          //   title: '签到失败',
          //   content: '无法使用定位权限，签到失败',
          //   confirmText: '太遗憾了',
          //   confirmColor: '#345391',
          //   showCancel: false
          // })
        }

      }
    })
  },
  goDetail:function(){
    console.log('跳转详情页面')
  },
  selectAll:function(){
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    let list = this.data.items;
    list.forEach(function(item){
      item.checked = selectAllStatus;
    })
    console.log(list)
    // 页面重新渲染
    this.setData({
      selectAllStatus,
      items:list
    });
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