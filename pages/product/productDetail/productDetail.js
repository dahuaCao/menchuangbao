// pages/goods/goodsDetail/goodsDetail.js
const http = require('../../../utils/http.js');
const utils = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
let valueObj = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    openAttr: true,
    openBugdet:true,
    specificationList:[],
    id:'',
    scrollHeight:'',
    scrollTop:0,
    totalPrice:0,
    budgetLists:[],//预算造价集合
    attachs:[],//附加服务集合
    params:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })  
    this.getDetail(options.id)  
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
  openAttr:function(){
    this.setData({
      openAttr:false
    })
   this.pageScrollToBottom();
  },
  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function () {
    const _this = this;
    wx.createSelectorQuery().select('#attr_pop').boundingClientRect(function (rect) {
      _this.setData({
        scrollHeight: rect.height
      })
    }).exec()
  },
  getDetail:function(id){
    const _this = this;
    http.$request(api.GoodsDetail, {goodsId:id}).then(function(res){
        _this.setData({
          goods:res.data,
          specificationList: res.data.attr,
          id:res.data.goods.id
        })
      const article = res.data.detail.goodsDetail;
      WxParse.wxParse('article', 'html', article, _this, 14);
    })
  },
  closeBox:function(){
    this.setData({
      openAttr: true
    });
  },
  getValue:function(event){
    console.log(event)
    const type = event.currentTarget.dataset.name;
    const value = event.detail.value ? event.detail.value :1;
    valueObj[type] = value;
    this.caculPrice();

  },
  caculPrice:function(){
    let totalPrice = 0;
    let lists = this.data.budgetLists;
    lists.forEach(function(item){
      let count = valueObj[item.name] ? valueObj[item.name] : 1;
      totalPrice += item.value * count;
      if (item.attach){
        if (count > item.attach.control.value){
          totalPrice += item.attach.attachGt.value
        }else{
          totalPrice += item.attach.attachLte.value
        }
      }
    })
    this.setData({
      totalPrice
    })
  },
  clickSkuValue:function(e){
    const _list = this.data.specificationList;
    const name = e.currentTarget.dataset.name;
    const value = e.currentTarget.dataset.value;
    _list.forEach(function(item){
      if(item.name == name){
        item.list.forEach(function(item1){
          if(item1.name == value){
            item1.value = 1
          }else{
            item1.value = 0
          }
        })
      }
    })
    this.setData({
      specificationList: _list
    }) 
    if (this.isCheckedAllSpec()){
      this.getPrice();
    }

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return this.getCheckedSpecValue().every(function (item) {
      return item.checked == true
    })
  },
  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let _list = this.data.specificationList;
    let checkedValues = [];
    _list.forEach(function(item){
      let obj = {};
      obj[item.name] = '';
      item.list.forEach(function(item1){
        if(item1.value == '1'){
          obj[item.name] = item1.name
          obj.checked = true;
        }
      })
      checkedValues.push(obj)
    })
    return checkedValues;
  },
  getPrice:function(){
    const _this = this;
    let dataObj = {};
    this.getCheckedSpecValue().forEach(function(item){
        Object.assign(dataObj,item)
    })
    delete dataObj.checked;
    let id = this.data.id;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      params: dataObj
    })
    http.$request(api.GoodsParams, {goodsId: id, standard: JSON.stringify(dataObj)}).then(function (res) {
      wx.hideLoading();
      const data = res.data;
      let attachs = [];
      if (res.errno == '-1'){
        wx.showToast({
          image: '/images/icon_error.png',
          title: res.errmsg
        });
        
        _this.setData({
          openBugdet: true,
          budgetLists: [],
          attachs: []
        })
        return;
      }
      if(data.prices&&data.prices.length > 0){
        data.prices.forEach(function(item){
          if(item.attach){
            attachs.push(item.attach)
          }
        })
        _this.setData({
          openBugdet: false,
          budgetLists: res.data.prices,
          attachs,
          scrollHeight: 420,
          scrollTop: 500
        })
        valueObj = {};
      }else{
        _this.setData({
          openBugdet: false,
          budgetLists: res.data.prices,
          attachs:[]
        })
      }
      _this.caculPrice();
    })
  },
 
  addToCart:function(){
    var _this = this;
    if (this.data.openAttr == true) {
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
      const params = this.data.params;
      http.$request(api.AddCart, { goodsId: this.data.id, standard: JSON.stringify(params)}).then(function(res){
        console.log(res)
        if (res.errno == '0'){
            console.log(123)
            wx.switchTab({
              url: '/pages/shopCart/index/index',
            })
          }else{
            wx.showToast({
              image: '/images/icon_error.png',
              title: res.errmsg
            });
            return false;
          }
      })
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