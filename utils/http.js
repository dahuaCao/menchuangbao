/**
 * 封装http 请求方法
 */
const apiUrl = "https://www.xxx.cn"; //服务器api地址

let headObj = {
  "content-type": "application/json;charset=UTF-8"
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
      header: headObj,
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
