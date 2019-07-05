//接口服务器地址
var WxApiRoot = 'https://192.168.31.195/api/';
// var WxApiRoot = 'https://192.168.31.156/api/';
// var WxApiRoot = 'https://www.xyzcwl.com:8081/api/';


module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  HomePictrue: WxApiRoot + 'home/picture',

  GetRegionList: WxApiRoot + 'address/regionList',//获取服务区域地址接口
  AddressSave: WxApiRoot + 'address/add',//个人地址详情保存
  AddressList: WxApiRoot + 'address/list', //个人收货地址列表
  AddressDetail: WxApiRoot + 'address/getById', //收货地址详情
  AddressUpdate: WxApiRoot + 'address/update', //保存收货地址
  AddressDelete: WxApiRoot + 'address/delete', //删除收货地址

  HelpCenterList: WxApiRoot + 'helpCenter/list',//帮助中心list接口
  newsCenterList: WxApiRoot + 'newsCenter/list',//产品时讯list查询
  newsCenterDetail: WxApiRoot + 'newsCenter/detail',//产品时讯详情查询
  suggestSubmit: WxApiRoot + 'suggestion/submit',//意见反馈

  CatalogList: WxApiRoot + 'goods/goodsCategory',//产品中心
  CatalogCurrent: WxApiRoot + 'goods/list',//产品中心列表
  GoodsDetail:WxApiRoot + 'goods/goodsDetail', //产品详情
  GoodsParams: WxApiRoot + 'goods/goodsParams', //产品详情参数查询
  AddCart: WxApiRoot + 'cart/add', //商品添加购物车
}