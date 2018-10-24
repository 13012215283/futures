// @flow

/**
 * 计算履行保证金和手续费
 *
 * @param {number} price 建仓价格
 * @param {number} position 建仓手数
 *
 * @returns {Object} 返回保证金和手续费
 */
export function compute(price: number, position: number): Object {
  let parsePrice = +price;
  let parsePosition = +position;
  if (Number.isNaN(parsePrice)) {
    parsePrice = 0;
  }
  if (Number.isNaN(parsePosition)) {
    parsePosition = 0;
  }
  const margin = parsePrice * parsePosition * 20 / 100;
  const commission = margin * 5 / 1000;
  return {
    margin: margin.toFixed(2),
    commission: commission.toFixed(2),
  };
}
