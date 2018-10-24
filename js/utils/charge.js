import { Platform } from 'react-native';
import Pingpp from 'pingpp-react-native';
import { request } from 'futures/utils/request';
import { apis, errtips } from 'futures/constants';
import createError from './createError';
/**
 * ping++银联支付
 *
 * @param {string} amount 金额
 * @param {string} body 商品描述信息
 * @param {string} source 入金'0'
 * @param {string} uId 用户id
 * @param {callback(res, error)}   callback 回调
 */
export function charge(amount, body, uId, source, callback) {
  const requestParams = {
    '41': {
      amount,
      body,
      channel: 'upacp',
      client_ip: '127.0.0.1',
    },
    '42': {
      source,
    },
    '00': uId,
  };

  request(apis.PayC_createCharge, requestParams)
    .then(response => {
      if (Platform.OS === 'ios') {
        return checkOrderState4Ios(response);
      } else if (Platform.OS === 'android') {
        return checkOrderState4And(response);
      }
      throw createError('OS_INVALID');
    })
    .then(orderNo => {
      const paidOrNotParams = { '00': uId, '43': orderNo };
      return request(apis.PayC_paidOrNot, paidOrNotParams);
    })
    .then(orderRes => {
      callback(orderRes, null);
    })
    .catch(error => {
      callback(null, hanldeError(error));
    });
}

function checkOrderState4Ios(response) {
  return new Promise((resolve, reject) => {
    Pingpp.createPayment(
      {
        object: response,
        urlScheme: 'tcFutrues',
      },
      (res, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.orderNo);
        }
      }
    );
  });
}

function checkOrderState4And(response) {
  return new Promise((resolve, reject) => {
    Pingpp.createPayment(JSON.stringify(response), result => {
      const res = JSON.parse(result);
      if (res.error_msg) {
        reject(res.error_msg);
      } else {
        resolve(response.orderNo);
      }
    });
  });
}

function hanldeError(error) {
  if (error.code in errtips) {
    return errtips[error.code];
  }
  // 处理ping++返回的错误码
  switch (error.code) {
    case 5:
      return '支付取消';
    case 9:
      return '支付失败';

    default:
      return '未知错误，请稍后重试';
  }
}
