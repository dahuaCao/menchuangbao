// components/timeLin/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists: {
      type: Array,
      value: [
        {
          "id": 131,
          "orderId": "201907231657003095",
          "orderSchedule": 1,
          "schedule": "待接单",
          "processTime": "2019-07-23 16:57:00"
        },
        {
          "id": 131,
          "orderId": "201907231657003095",
          "orderSchedule": 1,
          "schedule": "已接单",
          "processTime": "2019-07-23 16:57:00"
        },
        {
          "id": 131,
          "orderId": "201907231657003095",
          "orderSchedule": 1,
          "schedule": "待安装",
          "processTime": "2019-07-23 16:57:00"
        }

      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: [
      {
        "id": 131,
        "orderId": "201907231657003095",
        "orderSchedule": 1,
        "schedule": "待接单",
        "processTime": "2019-07-23 16:57:00"
      },
      {
        "id": 131,
        "orderId": "201907231657003095",
        "orderSchedule": 1,
        "schedule": "已接单",
        "processTime": "2019-07-23 16:57:00"
      },
      {
        "id": 131,
        "orderId": "201907231657003095",
        "orderSchedule": 1,
        "schedule": "待安装",
        "processTime": "2019-07-23 16:57:00"
      }

    ],
    maxHeight: '60rpx',
    toggle: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change: function () {
      let value = !this.data.toggle;
      if (value) {
        this.setData({
          maxHeight: '1000rpx',
          toggle: value
        })
      } else {
        this.setData({
          maxHeight: '60rpx',
          toggle: value
        })
      }
    }
  },
  lifetimes: {
    attached: function () {
      let lists = this.properties.lists;
      this.setData({
        lists
      })
    }
  }
})
