import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, PanResponder } from 'react-native';

import noop from 'futures/utils/noop';
import styles from './style';

/**
 * 选择字母的Item
 * @property index:选择字母的index值
 * @property text：选择字母item的显示值
 */

export default class BarItem extends Component {
  static defaultProps = {
    scrollToSelector: noop,
    onPanResponderStart: noop,
    redBac: false,
    onPanResponderMove: noop,
  };

  constructor(props) {
    super(props);

    this.onPanResponderGrant = this.onPanResponderGrant.bind(
      this,
      this.props.offset
    );
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
  }

  componentWillMount() {
    this.watcher = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
    });
  }

  onPanResponderGrant(itemindex) {
    this.props.scrollToSelector(itemindex);
  }

  onPanResponderMove(e, gestureState) {
    const posY = gestureState.moveY;
    const itemIndex = Math.floor((posY - 118) / 17);
    this.props.onPanResponderMove(itemIndex);
  }

  render() {
    const { text, redBac } = this.props;
    return (
      <View
        style={[styles.selectBarItem, redBac ? styles.redBac : '']}
        {...this.watcher.panHandlers}
      >
        <Text style={[styles.barItemText, redBac ? styles.whiteFont : '']}>
          {text}
        </Text>
      </View>
    );
  }
}

BarItem.propTypes = {
  scrollToSelector: PropTypes.func,
  offset: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPanResponderStart: PropTypes.func,
  redBac: PropTypes.bool,
  onPanResponderMove: PropTypes.func,
};
