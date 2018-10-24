import React from 'react';

import PropTypes from 'prop-types';

import noop from 'futures/utils/noop';
import { StatusBtn } from 'futures/components/TradeBlock';

import BaseBlock from './BaseBlock';

/**
 * 持仓列表块儿
 * @property futureId 期货代码
 * @property futureName 期货名称
 */
const Delivering = props => (
  <BaseBlock {...props}>
    <StatusBtn status="pending" />
  </BaseBlock>
);

const Delivered = props => (
  <BaseBlock {...props}>
    <StatusBtn status="resolved" />
  </BaseBlock>
);

module.exports = { Delivering, Delivered };

Delivering.propTypes = {
  toRepairTail: PropTypes.func,
  toEveningUp: PropTypes.func,
};

Delivering.defaultProps = {
  toRepairTail: noop,
  toEveningUp: noop,
};

Delivered.propTypes = {
  toRepairTail: PropTypes.func,
  toEveningUp: PropTypes.func,
};

Delivered.defaultProps = {
  toRepairTail: noop,
  toEveningUp: noop,
};
