import React, { Component } from 'react';
import {
  Text,
  View,
  PanResponder,
  Animated,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

import Tab from './Tab';

export default class Tabs extends Component {
  static propTypes = {
    tabNames: PropTypes.arrayOf(PropTypes.string).isRequired, // 包含选项卡名称的数组
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    containerStyle: ViewPropTypes.style,
    selectedTextStyle: Text.propTypes.style,
    selectedTabStyle: ViewPropTypes.style,
    defaultTextStyle: Text.propTypes.style,
    onChangeTab: PropTypes.func,
    activeIndex: PropTypes.number,
    swipeShield: PropTypes.number,
  };

  static defaultProps = {
    onChangeTab: () => {}, // 切换tab时调用的函数，返回当前tab的索引
    containerStyle: {}, // 外部样式
    selectedTextStyle: {}, // 选择某个tab的字体样式
    selectedTabStyle: {}, // 选择某个tab的样式
    defaultTextStyle: {}, // 默认的tab字体样式
    activeIndex: 0, // 指定激活的tab索引
    swipeShield: 100, // 滑动的阈值
  };

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: this.validatedActiveIndex(this.props.activeIndex),
    };

    /* 开始滑动和结束滑动的横坐标x */
    this.startSwipe = 0;
    this.endSwipe = 0;

    this.onSelected = this.onSelected.bind(this);
  }

  componentWillMount() {
    if (this.props.swipeShield !== 0) {
      this.setPanResponder();
    }
  }

  /* 用户点击tab栏时触发 */
  onSelected(index) {
    this.setState({
      activeIndex: index,
    });
    this.props.onChangeTab(index);
  }

  getSwipedPageIndex(prevIdx, start, end) {
    const { swipeShield } = this.props;
    const moveVector = start - end;
    if (Math.abs(moveVector) < swipeShield) return prevIdx;
    return this.validatedActiveIndex(
      moveVector > 0 ? prevIdx - 1 : prevIdx + 1
    );
  }

  setPanResponder() {
    // 用来处理滑动手势的函数
    /* eslint-disable no-underscore-dangle */
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y}0 现在会被设置为0
        this.startSwipe = gestureState.moveX;
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        this.endSwipe = gestureState.moveX;
        this.setState(prevState => {
          const prevActiveIdx = prevState.activeIndex;
          const changedIndex = this.getSwipedPageIndex(
            prevActiveIdx,
            this.startSwipe,
            this.endSwipe
          );

          if (prevActiveIdx !== changedIndex) {
            // 切换页时调用onChangeTab
            this.props.onChangeTab(changedIndex);
          }

          return { activeIndex: changedIndex };
        });
      },
    });
  }

  validatedActiveIndex(idx) {
    const { tabNames } = this.props;
    const len = tabNames.length;
    if (idx > len - 1) return len - 1;
    return idx < 0 ? 0 : idx;
  }

  render() {
    const translateX = Animated.add(1, 2).interpolate({
      inputRange: [-1, 0],
      outputRange: [-1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, this.props.containerStyle]}>
          {this.props.tabNames.map((text, index) => (
            <Tab
              key={text}
              text={text}
              event={() => this.onSelected(index)}
              isActive={index === this.state.activeIndex}
              selectedTabStyle={this.props.selectedTabStyle}
              selectedTextStyle={this.props.selectedTextStyle}
              defaultTextStyle={this.props.defaultTextStyle}
            />
          ))}
        </View>
        <Animated.View
          style={{ flex: 1, transform: [{ translateX }] }}
          {...(this.props.swipeShield !== 0
            ? this._panResponder.panHandlers
            : {})}
        >
          {this.props.children[this.state.activeIndex]}
        </Animated.View>
      </View>
    );
  }
}
