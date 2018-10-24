import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, sizes } from 'futures/components/themes';
import Timeline from 'futures/components/TimelineBlock/TimeLine';
import { twoDecimal } from 'futures/utils/numberFormat';
import { px2dp } from 'futures/utils/px2dp';
import { BankRow } from './BankComponent';

/* 展示性组件 */
const Row = ({ title, children }) => (
  <View style={styles.row}>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View>{React.Children.map(children, child => child)}</View>
  </View>
);
Row.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const TimelineBlock = ({ isDone, date, time, title, context, isLast }) => (
  <View style={styles.timeBlock}>
    <Timeline
      date={time}
      year={date}
      isDone={isDone}
      isShowTimelineBar={!isLast}
    />
    <View style={{ width: px2dp(480), marginBottom: px2dp(isLast ? 0 : 64) }}>
      <Text style={{ fontSize: sizes.f2, color: colors[isDone ? 1001 : 1102] }}>
        {title}
      </Text>
      <Text style={{ fontSize: sizes.f1, color: colors[isDone ? 1001 : 1102] }}>
        {context}
      </Text>
    </View>
  </View>
);
TimelineBlock.propTypes = {
  isDone: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const OutMoneyProgressComponent = ({
  streamId,
  bankMsg,
  account,
  details,
  amount,
}) => (
  <View style={styles.container}>
    <View style={styles.info}>
      <Row title="订单编号">
        <Text style={styles.normalText}>{streamId}</Text>
      </Row>
      <Row title="出金至">
        <BankRow
          cardId={account}
          bankName={bankMsg.name}
          bankLogo={bankMsg.icon}
        />
      </Row>
      <Row title="出金金额">
        <Text style={[styles.normalText, { color: colors[1001] }]}>
          ￥{twoDecimal(amount)}
        </Text>
      </Row>
    </View>
    <View style={styles.timeline}>
      {details.map(({ time, detail2, detail1 }, index) => {
        const [date, tm] = time.split('\n');
        /* eslint-disable react/no-array-index-key */
        return (
          <TimelineBlock
            key={index}
            context={detail2}
            date={date}
            title={detail1}
            time={tm}
            isDone={index === 0}
            isLast={index === details.length - 1}
          />
        );
      })}
      <View style={{ height: 50, width: 50 }} />
    </View>
  </View>
);
OutMoneyProgressComponent.propTypes = {
  streamId: PropTypes.string.isRequired,
  bankMsg: PropTypes.objectOf(PropTypes.string).isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

export default OutMoneyProgressComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(32),
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
    padding: px2dp(32),
    backgroundColor: colors.white,
  },
  info: {
    padding: px2dp(10),
    height: px2dp(207),
    borderBottomWidth: 1,
    borderBottomColor: colors[1104],
  },
  row: {
    flexDirection: 'row',
    marginBottom: px2dp(22),
  },
  titleWrapper: {
    width: px2dp(140),
  },
  title: {
    fontSize: sizes.f2,
    color: colors[1102],
  },
  normalText: {
    color: colors[1101],
    fontSize: sizes.f2,
    fontWeight: 'bold',
  },
  timeline: {
    paddingTop: px2dp(32),
  },
  timeBlock: {
    width: '100%',
    flexDirection: 'row',
  },
  progessWrapper: {},
});
