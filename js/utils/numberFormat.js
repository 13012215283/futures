const numReg = /(\d)(?=(\d{3})+(?!\d))/g;

export function formatVal(str, thousandSeparator = '') {
  if (!str) return '';
  if (str.indexOf(thousandSeparator) === -1) return str;
  return str.split(thousandSeparator).join('');
}

export function transNumToStr(value) {
  let parseValue = value;
  if (!value) return '';
  if (typeof value === 'number') {
    parseValue = value.toString();
  }
  return parseValue;
}

export function splitDecimal(numStr) {
  // 输入.时
  const parts = numStr.split('.');
  const beforeDecimal = parts[0];
  const afterDecimal = parts[1] || '';

  return {
    beforeDecimal,
    afterDecimal,
  };
}

export function numberFormat(numStr, thousandSeparator = ',') {
  let str;
  str = transNumToStr(numStr);
  str = formatVal(str, thousandSeparator);
  const { beforeDecimal, afterDecimal } = splitDecimal(str);
  let decimal = afterDecimal;
  if (str.indexOf('.') !== -1) {
    decimal = `.${afterDecimal}`;
  }
  const integer =
    beforeDecimal.replace(numReg, `$1${thousandSeparator}`) + decimal;
  return integer;
}

// 将数字保留两位小数
export const twoDecimal = num => parseFloat(num).toFixed(2);
