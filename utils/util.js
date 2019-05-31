const QQMapWX = require('libs/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({ key: 'HPZBZ-ERACI-5VEG2-5YTBO-AX723-DCBCV' });//此key需要用户自己申请

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

const getLocation = function(callback) {

  wx.getSetting({
    success: (res) => {
      /**
       * res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
       * res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
       * res.authSetting['scope.userLocation'] == true    表示 地理位置授权
       */
      if (!res.authSetting['scope.userLocation']) {
        wx.showModal({
          title: '位置信息授权',
          content: '位置授权暂未开启，无法完成签到',
          confirmText: '开启授权',
          confirmColor: '#345391',
          cancelText: '仍然拒绝',
          cancelColor: '#999999',
          success: function(res) {
            if (res.confirm) {
              wx.openSetting({
                success: function() {
                  // 调用接口

                  qqmapsdk.reverseGeocoder({
                    success: function(res) {
                      callback(res)
                      // that.globalData.location = res.result.address_component.city;
                    },
                    fail: function(res) {
                      // that.globalData.location = '定位失败';
                      callback('定位失败');

                    },
                    complete: function(res) {

                    }
                  });

                },
                fail: function() {
                  console.log('openSetting.failed')
                }
              })
            } else {
              wx.showModal({
                title: '签到失败',
                content: '无法使用定位权限，签到失败',
                confirmText: '太遗憾了',
                confirmColor: '#345391',
                showCancel: false,
                success: function() {
                  callback('定位失败');
                }
              })
            }
          }
        })
      } else {
        // 调用接口
        qqmapsdk.reverseGeocoder({
          success: function(res) {
            callback(res)
            // that.globalData.location = res.result.address_component.city;
          },
          fail: function(res) {
            // that.globalData.location = '定位失败';
            callback('定位失败');

          },
          complete: function(res) {

          }
        });
      }

    }
  })
}
module.exports = {
  formatTime: formatTime,
  getLocation: getLocation
}