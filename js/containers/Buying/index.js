import React, { Component } from 'react';
import Entrust from '../Entrust';

// @flow
type Props = {
  order: object,
  onPress: Function,
  navigation: object,
};

export default class Buying extends Component<Props> {
  render() {
    return (
      <Entrust
        type="buying"
        order={this.props.order}
        onPress={this.props.onPress}
        navigation={this.props.navigation}
      />
    );
  }
}
