import colorString from 'color-string';

/**
 * 为颜色添加透明度。
 *
 * - 如果颜色已有透明度值，则修改原有透明度。
 * - 如果透明度超出范围，返回原颜色值。
 * - 如果参数 color 不是合法的颜色值，直接返回 color。
 *
 * @param {string} color 颜色值
 * @param {number} value 透明度
 *
 * @returns {string} 返回大写的 hex 格式的颜色值
 */
function alpha(color, value) {
  if (value < 0 || value > 1) {
    return String(color).toUpperCase();
  }

  const rgb = colorString.get.rgb(color);

  if (rgb === null) {
    return null;
  }

  const [r, g, b] = rgb;

  return colorString.to.hex([r, g, b], value);
}

export { alpha };
