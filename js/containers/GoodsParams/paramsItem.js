import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

// @flow
type Props = {
  paramsName: string,
  paramsValue: string,
};

export default class paramsItem extends Component<Props> {
  render() {
    const { paramsName, paramsValue } = this.props;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.nameTextView}>
          <Text style={styles.nameText}>{paramsName}</Text>
        </View>
        <View style={styles.paramsTextView}>
          <Text style={styles.paramsText}>{paramsValue}</Text>
        </View>
      </View>
    );
  }
}

paramsItem.defaultProps = {
  paramsName: '',
  paramsValue: '',
};
