import warning from 'warning';

/**
 * 获取接口地址
 *
 * @param {string} reqCode 接口代码
 * @returns {string} 接口地址
 */
export function getUrl(reqCode) {
  if (__DEV__) {
    warning(
      typeof reqCode === 'string',
      `参数类型应该是字符串，传入的是 ${typeof reqCode}`
    );

    return `http://106.75.4.184:8855/${reqCode}`;
  }

  return `http://106.75.4.184:8855/${reqCode}`;
}

/**
 * 获取 WebSocket 地址
 *
 * @returns {string} 接口地址
 */
export function getWebSocketUrl() {
  if (__DEV__) {
    return 'ws://106.75.4.184:7397';
  }

  return 'ws://106.75.4.184:7397';
}

/**
 * 获取 上传图片 地址
 * @returns { string } 接口地址
 */
export function getUploadPicUrl() {
  return 'http://106.75.50.97:8866/upload';
}

export default getUrl;
