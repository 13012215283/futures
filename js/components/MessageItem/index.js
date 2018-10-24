/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';

// @flow
type Props = {
  data: object,
};
export default class MessageItem extends Component<Props> {
  render() {
    const { date: time, message } = this.props.data;
    return (
      <View style={style.container}>
        <Text style={style.time}>{time}</Text>
        <View style={style.row}>
          <Image style={style.image} source={require('./image/msgIcon.png')} />
          <View style={style.contentContainer}>
            <View style={style.trangleBg} />
            <View style={style.trangle} />

            <View style={{ flex: 1 }}>
              <View style={style.textContainer}>
                <Text style={style.text}>{message}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
