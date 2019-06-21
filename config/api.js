//接口服务器地址
var WxApiRoot = 'https://192.168.31.195/api/';

module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  HomePictrue: WxApiRoot + 'home/picture',
}