import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { px2dp } from '../utils/px2dp';

// @flow
type Props = {
  viewStyle?: Object,
  textStyle?: Object,
  navigation: Object,
  tarNav: String,
  navName: String,
  params: Object,
  event?: Function,
};

export default class BackBtn extends Component<Props> {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (!this.props.event) {
      this.props.navigation.navigate(this.props.tarNav, this.props.params);
    } else {
      this.props.event();
    }
  }

  render() {
    const { textStyle, viewStyle } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={viewStyle || styles.goBackView}>
          <Text style={[styles.goBackText, textStyle]}>
            {this.props.navName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  goBackView: {
    marginRight: px2dp(32),
    height: '100%',
    justifyContent: 'center',
  },
  goBackText: {
    color: '#fff',
    fontSize: px2dp(28),
  },
});
