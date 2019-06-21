// components/swiper/index.js
Component({
  externalClasses: ["swiper-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    swiperObj:{
      type: Object,
      value:{
        indicatorDots: false,
        interval: 5000,
        duration: 1000
      }
    },
    imgUrls:{
      type:Array,
      value: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
