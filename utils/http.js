/**
 * 封装http 请求方法
 */
// const host = "https://www.easy-mock.com/mock/5cee23370ce2e125d013e304/mcb"; //服务器api地址
const host = "http://118.24.234.156:8090";

let headObj = {
  "Content-Type": "application/x-www-form-urlencoded"
}
// Object.assign(form, obj); 对象合并
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function requestPost(url, postData, header) {
  //加载动画
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + url,
      header: headObj,
      data: postData,
      method: 'POST',
      success: function(res) {
        wx.hideLoading();
        //参数值为res.data,直接将返回的数据传入
        resolve(res.data);
      },
      fail: function(res) {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject(res);
      },
      complete: function() {
        console.log('complete');
      }
    })
  })
}


//GET请求，不需传参，直接URL调用，
function getData(url,header) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: host + url,
      header: header || headObj,
      method: 'GET',
      success: function (res) {
        resolve(res.data);
      },
      fail: function (res) {
        reject(res);
      },
    })
  })
}

function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-MCB-Token': wx.getStorageSync('token')
      },
      success: function (res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 502 || res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}
module.exports = {
  $get: getData,
  $post: requestPost,
  $request: request
}
