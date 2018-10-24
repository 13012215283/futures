import React from 'react';
import { Text, SectionList } from 'react-native';
import PropTypes from 'prop-types';

import {
  BlockHeader,
  LabBtn,
  BothSideContainer,
} from 'futures/components/TradeBlock';
import { numberFormat } from 'futures/utils/numberFormat';
import BasePayment from './BasePayment';

import styles from './style';

const renderListHeaderComponent = (name, number) => (
  <BlockHeader
    headtitle={name}
    headerStyle={styles.headerStyle}
    headerFont={styles.headerFont}
  >
    <LabBtn text={number} />
  </BlockHeader>
);

const renderItemComponent = ({ item }) => (
  <BothSideContainer containerStyle={styles.containerStyle}>
    <Text style={styles.nameText}>{item.name}</Text>
    <Text style={styles.valueText}>{item.value}</Text>
  </BothSideContainer>
);

/**
 * 采购补款
 * @property futureName 期货名称
 * @property futureId 期货id
 * @property price 建仓价格
 * @property num 交易手数
 * @property balance 可用金额
 * @property deliveryPrice 总计
 */

const Purchase = props => (
  <BasePayment {...props} actionForPaying={props.actionForPaying}>
    <SectionList
      ListHeaderComponent={renderListHeaderComponent(
        'Apple iPhone X(A1865)256GB 深空灰色按钮',
        '01588'
      )}
      sections={[
        {
          data: [
            { name: '建仓价格', value: '100.00' },
            { name: '交易手数', value: '10手' },
            { name: '已缴纳保证金', value: '3,225.00' },
            { name: '商品采购费', value: '666.00' },
            { name: '交易手续费', value: '666.00' },
          ],
        },
      ]}
      renderItem={renderItemComponent}
      bounces={false}
    />
  </BasePayment>
);

const Tail = props => (
  <BasePayment {...props}>
    <SectionList
      ListHeaderComponent={renderListHeaderComponent(
        props.futureName,
        props.futureId
      )}
      sections={[
        {
          data: [
            {
              name: '建仓价格',
              value: numberFormat(parseFloat(props.price).toFixed(2)),
            },
            {
              name: '交易手数',
              value: props.num,
            },
            {
              name: '已缴纳保证金',
              value: numberFormat(parseFloat(props.deposit).toFixed(2)),
            },
            {
              name: '应补缴尾款',
              value: numberFormat(parseFloat(props.deliveryPrice).toFixed(2)),
            },
          ],
        },
      ]}
      renderItem={renderItemComponent}
      bounces={false}
    />
  </BasePayment>
);

renderItemComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};

Tail.propTypes = {
  futureName: PropTypes.string,
  futureId: PropTypes.string,
  num: PropTypes.string,
  price: PropTypes.string,
  deposit: PropTypes.string,
  deliveryPrice: PropTypes.string,
};
Tail.defaultProps = {
  futureName: '',
  futureId: '',
  num: '',
  price: '',
  deposit: '',
  deliveryPrice: '',
};

Purchase.propTypes = {
  actionForPaying: PropTypes.func.isRequired,
};

module.exports = { Purchase, Tail };
