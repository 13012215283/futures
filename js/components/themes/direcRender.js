import colors from './colors';

const direcStyle = {
  1: { text: '买入', color: { color: colors['1001'] } },
  2: { text: '卖出', color: { color: colors['1002'] } },
};

const direcType = {
  1: { text: '买', color: { color: colors['1001'] }, direction: '买入' },
  2: { text: '卖', color: { color: colors['1002'] }, direction: '卖出' },
  3: { text: '买平', color: { color: colors.black }, direction: '买入' },
  4: { text: '卖平', color: { color: colors.black }, direction: '卖出' },
};

module.exports = { direcStyle, direcType };
