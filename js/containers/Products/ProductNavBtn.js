import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { px2dp } from '../../utils/px2dp';
import { colors, sizes } from '../../components/themes';

// @flow
type Props = {
  headerTitle: Object,
  onPress: Function,
};

export default class NavBtnItem extends Component<Props> {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this.props.onPress();
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    height: '100%',
    marginRight: px2dp(25),
    marginLeft: px2dp(25),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: colors.white,
    fontSize: sizes.f4,
    textAlign: 'center',
  },
});
