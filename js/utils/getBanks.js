import axios from 'axios';
import createError from './createError';

const url = 'http://huisheng.ufile.ucloud.cn/3c/test/bank.json';

export default function getBanks() {
  return axios
    .get(url, {})
    .then(response => response.data)
    .then(data => data)
    .catch(() => {
      throw createError('GET_BANKS_FAILED');
    });
}
