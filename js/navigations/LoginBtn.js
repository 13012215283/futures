import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from 'futures/components/themes';
import { px2dp } from '../utils/px2dp';
import { px2sp } from '../utils/px2sp';

const { white } = colors;

export default class LoginBtn extends Component<Props> {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate('Regist');
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.sideStyle}>
          <Text style={styles.fontStyle}>登录/注册</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LoginBtn.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: px2sp(32),
    color: white,
  },
  sideStyle: {
    paddingLeft: px2dp(17),
    paddingRight: px2dp(17),
  },
});
