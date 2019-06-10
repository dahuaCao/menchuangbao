// components/imageLoader/index.js
Component({
  externalClasses: ["my-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    //默认图片
    defaultImage:{
      type: String,
      value: 'images/preview.png',
    } ,
    //原始图片
    originalImage: String,
    width: {
      type: String,
      value: '100%',
    },
    height: {
      type: String,
      value: '100%',
    },
    //图片剪裁mode，同Image组件的mode
    mode: {
      type: String,
      value: 'scaleToFill',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    finishLoadFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    finishLoad: function (e) {
      console.log('jiazaiwancheng')
      this.setData({
        finishLoadFlag: true
      })
    }
  }
})
