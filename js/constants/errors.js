/**
 * 相关错误码
 */
export default {
  /** 未知错误 */
  UNKNOWN_ERROR: '1',

  /** 未知错误 */
  ERROR: 'ERROR',

  /** 解析错误 */
  SYNTAX_JSON: 'SYNTAX_JSON',

  /** token失效 */
  TOKEN_INVALID: 'TOKEN_INVALID',

  /** 参数不全 */
  PARAM_INCOM: 'PARAM_INCOM',

  /** 用户已存在 */
  USER_EXIST: 'USER_EXIST',

  /** 邀请码错误 */
  INVITECODE_ERROR: 'INVITECODE_ERROR',

  /** 帐号不存在 */
  USER_NOT_EXIST: 'USER_NOT_EXIST',

  /* 虚拟用户名格式错误 */
  VIRTUAL_NAME_FORMAT_ERROR: 'VIRTUAL_NAME_FORMAT_ERROR',

  /* 用户类型错误 */
  USERTYPE_ERROR: 'USERTYPE_ERROR',

  /** 密码错误 */
  PWD_NOT_EXIST: 'PWD_NOT_EXIST',

  /** 参数错误 */
  PARAM_ERROR: 'PARAM_ERROR',

  /** 发送次数超过限制 */
  SENDCODE_OVER_TIMES: 'SENDCODE_OVER_TIMES',

  /** 失效次数超过限制 */
  INVALIDCODE_OVER_TIMES: 'INVALIDCODE_OVER_TIMES',

  /** 验证码失效 */
  CODES_OVERDUE: 'CODES_OVERDUE',

  /** 验证码错误 */
  CODES_ERROR: 'CODES_ERROR',

  /** 价格超过了涨跌停板 */
  OPENINGPRICE_ERROR: 'OPENINGPRICE_ERROR',
  CLOSINGPRICE_ERROR: 'CLOSINGPRICE_ERROR',

  /** 委托已经成交，不能进行撤单 */
  ENTRUST_DEALED: 'ENTRUST_DEALED ',

  /** 平仓手数不能比持仓手数多 */
  POSITION_NUM_NOT_ENOUGH: 'POSITION_NUM_NOT_ENOUGH',

  /** 可用金额不足 */
  BALANCE_INSUFFICIENT: 'BALANCE_INSUFFICIENT',

  /** 此身份证号码不存在 */
  IDCARD_NOT_EXISTS: 'IDCARD_NOT_EXISTS',

  /** 手机号码错误 */
  PHONE_ERROR: 'PHONE_ERROR',

  /** 银行编号错误  */
  BANKNAME_ERROR: 'BANKNAME_ERROR',

  /** 银行卡号与所选银行不一致 */
  BANKCARD_ERROR: 'BANKCARD_ERROR',

  /** 审核中预计24小时内完成 */
  IN_REVIEW_24HOUR: 'IN_REVIEW_24HOUR',

  /** 该身份证号已认证 */
  IDCARD_VAILDED: 'IDCARD_VAILDED',

  /** 银行卡号已被绑定 */
  IDBANK_VAILDED: 'IDBANK_VAILDED',

  /** 用户不存在 */
  USER_NOT_EXITS: 'USER_NOT_EXITS',

  /** 已收藏 */
  ADDED_TO_FAVORITES: 'ADDED_TO_FAVORITES',

  /** 同一支期货，不能同时在两个不同的方向进行委托 */
  DIRECTION_ERROR: 'DIRECTION_ERROR',

  /** 未获取到支付结果 */
  PAY_WAIT: 'PAY_WAIT',

  /** 创建支付订单失败 */
  CREATE_CHARGE_FAILED: 'CREATE_CHARGE_FAILED',

  /** 手机系统信息(ios, androd)获取错误 */
  OS_INVALID: 'OS_INVALID',
};
