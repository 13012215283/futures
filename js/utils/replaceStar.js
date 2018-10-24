/**
 *  将需要隐藏的信息部分替换为 *
 *
 * @param {string} string
 * @param {number} 起始位置
 * @param {number} 替换数量
 */

function replaceStar(string, start, num) {
  while (num < 0) {
    // eslint-disable-next-line
    num += string.length;
  }
  const a = string.slice(0, start);
  const b = string.slice(start + num);
  return a + '*'.repeat(num) + b;
}

export { replaceStar };
