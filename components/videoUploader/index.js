// components/videoUploader/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isDisplay:{
      type:String,
      value:'block'
    },
    ID:{
      type: String,
      value: 'myVideo'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoSrc: ''
  },
  lifetimes: {
    attached() {
      this.id = this.properties.ID;
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 上传视频
    chooseVideo() {
      // 弹层  
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 10,
        camera: 'back',
        success: res => {
          this.setData({
            videoSrc: res.tempFilePath
          })      
          this.ctx = wx.createVideoContext(this.id, this);
        }
      })
    },
    // 删除视频
    videoDelete() {
      wx.showModal({
        title: '警告',
        content: '确定要删除该视频吗',
        success: res => {
          if (res.confirm) {
            this.setData({
              videoSrc: ''
            })
          }
        }
      })
    },
    videoPlay:function(){
       
      this.setData({
        isDisplay: "none"    //tab_image 来控制封面图 
      })
      this.ctx.requestFullScreen();
      this.ctx.play();
    },
    bindplay: function () {
      console.log(123)
      this.setData({
        isDisplay: "none"    //tab_image 来控制封面图 
      })
      this.ctx.requestFullScreen();
      this.ctx.play();
    },
    bindpause:function(){
      // this.setData({
      //   isDisplay: "block"    //tab_image 来控制封面图 
      // })
    },
    screenChange:function(e){
      let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
      if (!fullScreen){//退出全屏
        this.ctx.pause();
      }else{
        this.setData({
          isDisplay: "block"    //tab_image 来控制封面图 
        })
      }
    },
    closeVideo:function(){
      this.ctx.exitFullScreen();;
    }

  },

})