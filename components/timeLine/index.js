// components/timeLine/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists:{
      type:Array,
      value: ['待付维修定金', '已付上门服务费', '快到碗里来', '已付款', '未付定金']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maxHeight:'40rpx',
    toggle:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change:function(){
      let value = !this.data.toggle;
      if(value){
        this.setData({
          maxHeight: '1000rpx',
          toggle:value
        })
      }else{
        this.setData({
          maxHeight: '40rpx',
          toggle: value
        })
      }
      
    }
  }
})
