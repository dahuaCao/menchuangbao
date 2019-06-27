//接口服务器地址
var WxApiRoot = 'https://192.168.31.195/api/';
// var WxApiRoot = 'https://192.168.31.156/api/';

module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  HomePictrue: WxApiRoot + 'home/picture',
  HelpCenterList: WxApiRoot + 'helpCenter/list',//帮助中心list接口
  newsCenterList: WxApiRoot + 'newsCenter/list',//产品时讯list查询
  newsCenterDetail: WxApiRoot + 'newsCenter/detail',//产品时讯详情查询
  suggestSubmit: WxApiRoot + 'suggestion/submit',//意见反馈
  CatalogList: WxApiRoot + 'goods/goodsCategory',//产品中心
  CatalogCurrent: WxApiRoot + 'goods/list',//产品中心列表

}