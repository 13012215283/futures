import axios from 'axios';
import warning from 'warning';

import { getUploadPicUrl } from './config';
import createError from './createError';

export function uploadPic(pics) {
  const formData = new FormData();
  const picAr = [];
  if (typeof pics === 'string') {
    picAr.push(pics);
  }

  if (pics instanceof Array) {
    picAr.concat(pics);
  }

  picAr
    .map(pic => {
      const name = Date.parse(new Date()).toString();
      return { uri: pic, type: `multipart/form-data`, name };
    })
    .forEach(file => {
      formData.append('file', file);
    });

  return axios
    .post(getUploadPicUrl(), formData)
    .then(response => response.data)
    .then(response => {
      if (response.status === 1) {
        throw createError(response.code);
      }
      return response.body;
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
