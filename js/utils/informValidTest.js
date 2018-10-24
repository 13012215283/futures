export function testPhone(num) {
  const pattern = /^1[34578]\d{9}$/;
  return pattern.test(num);
}

export function testIDCards(num) {
  const reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
  const reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

  return reg15.test(num) || reg18.test(num);
}

export function testBankCard(num) {
  const reg = /^([1-9]{1})(\d{15}|\d{18})$/;
  const str = num.replace(/\s+/g, '');

  return reg.test(str);
}

module.exports = { testPhone, testIDCards, testBankCard };
