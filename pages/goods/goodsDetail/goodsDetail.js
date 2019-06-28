// pages/goods/goodsDetail/goodsDetail.js
const http = require('../../../utils/http.js');
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    openAttr: false,
    specificationList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    console.log(options.goodId)
    this.getDetail(options.goodId)
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

  },
  getDetail:function(id){
    const _this = this;
    http.$request(api.GoodsDetail, {goodsId:id}).then(function(res){
      

        _this.setData({
          goods:res.data,
          specificationList: res.data.attr
        })
    })
  },
  closeBox:function(){
    // this.setData({
    //   openAttr: false
    // });
  },
  clickSkuValue:function(e){
    const _list = this.data.specificationList;
    const name = e.currentTarget.dataset.name;
    const value = e.currentTarget.dataset.value;
    Object.keys(_list).forEach(function (key) {    
      if(key == name){
        _list[key].forEach(function(item){
          if(item.name == value){
            item.value = 1;
          }else{
            item.value = 0;
          }
        })
      }
    });
    this.setData({
      specificationList: _list
    })
    console.log(this.getCheckedSpecValue())
    
    if (this.isCheckedAllSpec){
      this.getPrice();
    }

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return this.getCheckedSpecValue().every(function (item) {
      return item.checked == true
    })
  },
  getPrice:function(){
    let dataObj = {};
    this.getCheckedSpecValue().forEach(function(item){
        Object.assign(dataObj,item)
    })
    console.log(dataObj)
    delete dataObj.checked;
    console.log(dataObj)
  },
  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let _list = this.data.specificationList;
    let checkedValues = [];
    Object.keys(_list).forEach(function(key){
      let obj = {};
      obj[key] = '';
      _list[key].forEach(function(item){
        if(item.value == '1'){
          obj[key] = item.name
          obj.checked = true;
        }
      })
      checkedValues.push(obj);
    })
    return checkedValues;
  },
  addToCart:function(){
    var _this = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        wx.showToast({
          image: '/images/icon_error.png',
          title: '请选择完整规格'
        });
        return false;
      }

      // //根据选中的规格，判断是否有对应的sku信息
      // let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
      // if (!checkedProductArray || checkedProductArray.length <= 0) {
      //   //找不到对应的product信息，提示没有库存
      //   wx.showToast({
      //     image: '/static/images/icon_error.png',
      //     title: '没有库存'
      //   });
      //   return false;
      // }

      // let checkedProduct = checkedProductArray[0];
      // //验证库存
      // if (checkedProduct.number <= 0) {
      //   wx.showToast({
      //     image: '/static/images/icon_error.png',
      //     title: '没有库存'
      //   });
      //   return false;
      // }

      // //添加到购物车
      // util.request(api.CartAdd, {
      //   goodsId: this.data.goods.id,
      //   number: this.data.number,
      //   productId: checkedProduct.id
      // }, "POST")
      //   .then(function (res) {
      //     let _res = res;
      //     if (_res.errno == 0) {
      //       wx.showToast({
      //         title: '添加成功'
      //       });
      //       that.setData({
      //         openAttr: !that.data.openAttr,
      //         cartGoodsCount: _res.data
      //       });
      //       if (that.data.userHasCollect == 1) {
      //         that.setData({
      //           collectImage: that.data.hasCollectImage
      //         });
      //       } else {
      //         that.setData({
      //           collectImage: that.data.noCollectImage
      //         });
      //       }
      //     } else {
      //       wx.showToast({
      //         image: '/static/images/icon_error.png',
      //         title: _res.errmsg,
      //         mask: true
      //       });
      //     }

      //   });
    }
  }
})