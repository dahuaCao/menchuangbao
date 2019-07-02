const QQMapWX = require('libs/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
  key: 'HPZBZ-ERACI-5VEG2-5YTBO-AX723-DCBCV'
}); //此key需要用户自己申请

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getLocation = function(callBack) {
  wx.getSetting({
    success: function(res) {
      if (!res.authSetting['scope.userLocation']) {
        wx.authorize({
          scope: 'scope.userLocation',
          success: function() {
            postion(callBack)
          },
          fail: function() {
            checkLocation(callBack)
          }
        })
      } else {
        postion(callBack)
      }
    }
  })

}
const postion = function(callBack) {
  // 调用接口
  qqmapsdk.reverseGeocoder({
    success: function(res) {
      callBack(res)
      // that.globalData.location = res.result.address_component.city;
    },
    fail: function(res) {
      // that.globalData.location = '定位失败';
      callBack('定位失败');
    },
    complete: function(res) {

    }
  });
}
const checkLocation = function(callBack) {
  const _this = this;
  wx.showModal({
    title: '位置信息授权',
    content: '位置授权暂未开启，需要获取您的位置授权方能正常使用',
    showCancel: false,
    success: function(res) {

      wx.openSetting({
        success: function(res) {
          if (!res.authSetting['scope.userLocation']) {
            checkLocation(callBack);
          } else {
            postion(callBack);
          }
        },
        fail: function() {
          checkLocation(callBack);
        }
      })

    }
  })
}
function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/images/icon_error.png'
  })
}
function debounce(handler,delay){
  let timer = null;
  return function(){
    let _this = this,_arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      handler.apply(_this,_arg)
    },delay)
  }
}
function throttle(fn,gapTime){
  let _lastTime = null;
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this,arguments);
      _lastTime = _nowTime
    }
  }
}
module.exports = {
  formatTime: formatTime,
  getLocation: getLocation,
  showErrorToast,
  debounce
}