import axios from 'axios';
import warning from 'warning';

import { getUrl } from './config';
import createError from './createError';

/**
 * 向后端发送请求
 *
 * @param {string} reqCode 接口编码
 * @param {JSON} body 请求对象
 */
export function request(reqCode, body) {
  warning(Number.isInteger(+reqCode), 'reqCode 必须是数字');
  return axios
    .post(getUrl(reqCode), JSON.stringify(body))
    .then(response => response.data)
    .then(response => {
      if (response.status === 1) {
        throw createError(response.code);
      }
      return JSON.parse(response.body || '{}');
    })
    .catch(error => {
      if (error instanceof SyntaxError) {
        warning(false, 'JSON 解析错误');
        throw createError('SYNTAX_JSON');
      }

      // 超时
      if (error.code === 'ECONNABORTED') {
        warning(false, '网络请求超时');
        throw createError('ECONNABORTED');
      }

      if (error.code !== undefined) {
        throw error;
      }

      warning(false, '未知网络错误');
      throw createError('ERROR');
    });
}
