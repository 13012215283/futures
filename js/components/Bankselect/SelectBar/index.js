import React, { Component } from 'react';
import PropTypes from 'prop-types';

import noop from 'futures/utils/noop';

import { View } from 'react-native';
import SelectItem from './SelectItem';

import styles from './style';
/**
 * 字母选择列表
 * @property bardata：渲染bar的数据
 */

export default class SelectBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentText: '',
      bardata: props.bardata,
    };

    this.scrollToSelector = this.scrollToSelector.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderStart = this.onPanResponderStart.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  onPanResponderMove(index) {
    const { bardata } = this.props;
    let itemIndex = index;
    if (index < 0) {
      itemIndex = 0;
    } else if (index >= bardata.length) {
      itemIndex = bardata.length - 1;
    }

    const { offset } = this.props.bardata[itemIndex];

    this.scrollToSelector(offset);
  }

  onPanResponderStart(text) {
    this.setState({ currentText: text });
  }

  scrollToSelector(offSet) {
    this.props.scrollToSelector(offSet);
  }

  refresh(data) {
    const currentText = data[0] ? data[0].text : '';
    this.setState({ bardata: data, currentText });
  }

  render() {
    const { currentText, bardata } = this.state;

    const barRender = bardata.map(item => (
      <SelectItem
        {...item}
        onPanResponderMove={this.onPanResponderMove}
        onPanResponderStart={this.onPanResponderStart}
        scrollToSelector={this.scrollToSelector}
        key={item.text}
        redBac={item.text === currentText}
      />
    ));

    return <View style={[styles.selectBar]}>{barRender}</View>;
  }
}

SelectBar.propTypes = {
  bardata: PropTypes.arrayOf(PropTypes.object),
  scrollToSelector: PropTypes.func,
};

SelectBar.defaultProps = {
  bardata: [],
  scrollToSelector: noop,
};
