// components/selectCity/index.js

let cityData = require("../../common/cityData.js");
let letterLineHeight = 0; //侧边悬浮item高度
Component({
  externalClasses: ["letter-class", "item-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    allCitys: {
      type: Array,
      value: cityData.cities
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    citys: [],
    currentIndex: "id0",
    activeIndex: ""
  },
  attached() {
    this.handleCity();
    wx.getSystemInfo({
      success: res => {
        letterLineHeight = (res.windowHeight - 80) / this.data.citys.length;
      }
    });
  },
  ready(){
    let query = wx.createSelectorQuery().in(this);
    let heightArr = []
    let s = 0
    query.selectAll('.pesticide').boundingClientRect((rect) =>{   
      rect.forEach((res) => {
        s += res.height
        heightArr.push(s)
      })
      this.setData({
        heightArr:heightArr
      })
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleCity() {
      let cityArry = [];
      for (let key in this.properties.allCitys) {
        let cityObject = {};
        cityObject.letter = key;
        cityObject.citylist = this.properties.allCitys[key];
        cityArry.push(cityObject);
      }
      this.setData({
        citys: cityArry
      });
    },
    citySelectEvent(e) {
      let detail = {
        city: e.target.dataset.city,
        letter: e.target.dataset.letter
      };
      this.triggerEvent('citySelect', detail);
    },
    scroll(e){
      let scrollTop = e.detail.scrollTop
      let scrollArr = this.data.heightArr
      for(let i = 0;i < scrollArr.length;i++){
        if(scrollTop >= 0 && scrollTop <scrollArr[0]){
          this.setData({
            activeIndex: 0
          })
        }else if(scrollTop >= scrollArr[i-1] && scrollTop < scrollArr[i]){
          this.setData({
            activeIndex: i
          })
        }
      }

    },
    slideStart(e) {
      let touchY = e.touches[0].clientY;
      let offsetTop = e.currentTarget.offsetTop;
      let index = parseInt((touchY - offsetTop) / letterLineHeight);
      this.setData({
        currentIndex: "id" + index,
        activeIndex: index
      });
    },
    slideMove(e) {
      let touchY = e.touches[0].clientY;
      let offsetTop = e.currentTarget.offsetTop;
      let index = parseInt((touchY - offsetTop) / letterLineHeight);
      console.log(index);
      this.setData({
        currentIndex: "id" + index,
        activeIndex: index
      });
    },
    slideEnd() {}
  }
});
