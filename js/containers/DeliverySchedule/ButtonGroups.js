import React from 'react';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { sizes } from 'futures/components/themes';
import Button from 'futures/components/Button';

function BasicBtn({ name, onPress, color, disabled }) {
  return (
    <Button
      type="operation"
      text={name}
      subStatus={color === 'white' ? 'order' : 'fillMoney'}
      containerStyle={{
        width: px2dp(134),
        height: px2dp(50),
        marginTop: px2dp(20),
        borderRadius: px2dp(25),
        marginLeft: px2dp(16),
      }}
      textStyle={{ fontSize: sizes.f1, paddingLeft: 0, paddingRight: 0 }}
      onPress={onPress}
      disabled={disabled}
    />
  );
}
BasicBtn.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function ConfirmBtn({ onPress, disabled }) {
  return (
    <BasicBtn
      name="确认收货"
      onPress={onPress}
      color="red"
      disabled={disabled}
    />
  );
}
ConfirmBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function ReturnGoodBtn({ onPress, disabled }) {
  return (
    <BasicBtn
      name="申请退货"
      onPress={onPress}
      color="white"
      disabled={disabled}
    />
  );
}
ReturnGoodBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function RefundBtn({ onPress, disabled }) {
  return (
    <BasicBtn
      name="申请退款"
      onPress={onPress}
      color="white"
      disabled={disabled}
    />
  );
}
RefundBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export { ConfirmBtn, ReturnGoodBtn, RefundBtn };
