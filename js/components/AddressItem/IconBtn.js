import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors, sizes } from 'futures/components/themes';
import { px2dp } from 'futures/utils/px2dp';
import { px2sp } from 'futures/utils/px2sp';

const { f1 } = sizes;

// @flow
type Props = {
  type: string,
  onPress: Function,
};

export default class IconBtn extends Component<Props> {
  render() {
    const { type, onPress, ...props } = this.props;
    const status = {
      edit: {
        icon: <Text style={style.icon}>&#xe80c;</Text>,
        text: '编辑',
      },
      delete: {
        icon: <Text style={style.icon}>&#xe804;</Text>,
        text: '删除',
      },
      default: {
        icon: (
          <Text style={[style.icon, { color: colors[1003] }]}>&#xe80b;</Text>
        ),
        text: '默认地址',
        textStyle: { color: colors[1003] },
      },
      circle: {
        icon: <Text style={style.icon}>&#xe80a;</Text>,
        text: '设为默认',
      },
    };

    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <View style={style.row}>
          {status[type].icon}
          <Text style={[style.iconText, status[type].textStyle]}>
            {status[type].text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
    color: colors[1102],
    fontSize: px2sp(32),
    marginRight: px2dp(10),
  },
  iconText: {
    fontSize: f1,
  },
  row: {
    flexDirection: 'row',
  },
});
