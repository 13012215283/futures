import React, { Component } from 'react';
import { View, WebView } from 'react-native';

import styles from './styles';

// @flow
type Props = {
  navigation: Object,
};

export default class BannerWebView extends Component<Props> {
  state = {};
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <WebView source={{ uri: params.webUrl }} />
      </View>
    );
  }
}
