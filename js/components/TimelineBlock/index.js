import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TimeLine from './TimeLine';
import { Block } from './Blocks';

import { px2dp } from '../../utils/px2dp';
import { sizes, colors } from '../themes';

export default class TimelineBlock extends React.Component {
  render() {
    const {
      isDone,
      date,
      isShowTimelineBar,
      title,
      desc,
      children,
    } = this.props;
    const [year, md] = date.split('\n');
    return (
      <View style={styles.container}>
        <TimeLine
          year={year}
          date={md}
          isDone={isDone}
          isShowTimelineBar={isShowTimelineBar}
        />
        <Block title={title} desc={desc} {...this.props}>
          {React.Children.map(children, child => child)}
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContainer: {
    marginBottom: px2dp(20),
  },
  blockContainer: {
    width: px2dp(554),
    padding: px2dp(17),
    marginBottom: px2dp(48),
    justifyContent: 'center',
    borderWidth: px2dp(1),
    borderRadius: px2dp(8),
    borderColor: colors[1103],
    backgroundColor: colors.white,
  },
  title: {
    fontSize: sizes.f2,
  },
});

TimelineBlock.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  isDone: PropTypes.bool, // 是否完成交割
  isShowTimelineBar: PropTypes.bool, // 是否显示时间轴bar，用于处理最后的交割流程
  year: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

TimelineBlock.defaultProps = {
  isDone: false,
  isShowTimelineBar: true,
  status: '0',
  title: '',
};
