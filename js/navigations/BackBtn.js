import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { px2dp } from '../utils/px2dp';

// @flow
type Props = {
  viewStyle?: Object,
  textStyle?: Object,
  navigation: Object,
};

export default class BackBtn extends Component<Props> {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this.props.navigation.goBack();
  }
  render() {
    const { textStyle, viewStyle } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={viewStyle || styles.goBackView}>
          <Text style={[styles.goBackText, textStyle]}>&#xe791;</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  goBackView: {
    marginLeft: px2dp(32),
    width: 30,
    height: '100%',
    justifyContent: 'center',
  },
  goBackText: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: '#fff',
  },
});
