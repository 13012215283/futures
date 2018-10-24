import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'futures/components/Button';
import style from './style';

/**
 * 交易单状态
 * @property status value: pending,resolved,revoke,usetted
 */

export default class StatusBtn extends Component {
  static defaultProps = {
    status: '',
  };
  render() {
    const { status } = this.props;
    const textRender = {
      pending: '交割中',
      resolved: '已交割',
      revoke: '已撤单',
      unsettled: '未成交',
    };

    return (
      <View style={style.btn}>
        <Button
          type="status"
          text={textRender[status]}
          subStatus={status}
          disabled
        />
      </View>
    );
  }
}

StatusBtn.propTypes = {
  status: PropTypes.string,
};
