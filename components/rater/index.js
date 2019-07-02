// components/rater/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category:{
      type: Boolean,
      value: false//5星评分组件类型 true 评分  false 展示
    },
    score:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgs: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    no_url: 'images/rater.png',
    yes_url: 'images/rater@select.png',
    starId:0//星星评分
  },
  
  lifetimes:{
    attached() {
      if(this.properties.score){
        var score = this.properties.score;
        console.log(score)
        this.setData({
          starId: score
        })
      }
     
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    select: function (e) {
      var key = e.currentTarget.dataset.key;
      this.setData({
        starId: key
      })

      this.triggerEvent('myScore',key)
    }
  }
})
