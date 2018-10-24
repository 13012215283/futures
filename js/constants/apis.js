/**
 * 接口代码
 */
export default {
  /** 注册 */
  UserC_register: '0000',

  /** 登录 */
  UserC_signIn: '0002',

  /** 忘记密码 */
  UserC_forgetPwd: '0003',

  /** 获取验证码 */
  UserC_sendCodes: '0004',

  /** 修改密码 */
  UserC_rePwd: '0005',

  /** 认证状态查询 */
  UserC_searchAuth: '0007',

  /** 验证验证码 */
  UserC_validCodes: '0015',

  /** 退出登录 */
  UserC_signOut: '0016',

  /** 邀请码列表 */
  UserC_inviteCodeList: '0017',

  /** 添加收藏 */
  UserC_addToFavorites: '0020',

  /** 删除收藏 */
  UserC_delFromFavorites: '0022',

  //---------------
  //  大盘相关
  //---------------

  /** 首页 */
  GdsC_index: '0101',

  /** 商品列表 */
  GdsC_gdsList: '0104',

  /** 商品分类 */
  GdsC_categoryList: '0102',

  /** 商品详情 */
  GdsC_gdsDetail: '0103',

  /** 商品交易详情 */
  GdsC_gdsTradeDetail: '0200',

  /** 商品走势图 */
  GdsC_trendCharts: '0201',

  /** 商品日线图 */
  GdsC_dailyCharts: '0202',

  /** 查询轮播图 */
  GdsC_carouselList: '0100',

  /** 查询是否收藏 */
  GdsC_collection: '0105',

  //-------------
  // 交割相关
  //-------------

  /** 交割列表 */
  DeliveryC_deliveryList: '0309',

  /** 补款页面数据 */
  DeliveryC_paymentData: '0318',

  /** 补款 */
  DeliveryC_payment: '0305',

  //------------
  // 历史相关
  //------------

  /** 历史列表 */
  HistoryC_historyList: '0310',

  //-------------
  // 委托相关
  //-------------

  /** 委托列表 */
  EntrustC_entrustList: '0308',

  /** 开仓页面拉取数据 */
  EntrustC_latestData: '0311',

  /** 开仓（挂委托） */
  EntrustC_addEntrust: '0300',

  /** 撤单 */
  EntrustC_cancelEntrust: '0302',

  /** 全款买 */
  EntrustC_buy: '0319',

  //-------------
  // 持仓相关
  //-------------

  /** 持仓列表 */
  PositionC_positionList: '0307',

  /** 设置止盈止损 */
  PositionC_stopProfitAndLoss: '0304',

  //-------------
  // 支付相关
  //-------------

  /** 创建支付订单 */
  PayC_createCharge: '0026',

  /** 查询ping++支付状态 */
  PayC_paidOrNot: '0027',

  /** 收获地址列表 */
  AddressC_list: '0029',
};
