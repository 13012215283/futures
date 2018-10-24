// @flow

import * as React from 'react';
import { View, ViewPropTypes, Text } from 'react-native';

import noop from 'futures/utils/noop';
import { px2dp } from '../utils/px2dp';
import { colors, sizes } from '../components/themes';

type navigationOptionsType = {
  title: string,
  headerStyle: ViewPropTypes.style,
  headerTitleStyle: object,
  headerLeft: React.Node,
  headerRight: React.Node,
};

type restParamsType = {
  headerLeft?: React.Node,
  headerRight?: React.Node,
};

/**
 * 导航属性
 *
 * @param {string} title 标题
 * @param {'red'|'white'} bgc 背景颜色
 * @param {*} restParams
 *
 * @returns {any} 导航属性配置
 */
function navOptions(
  title: string,
  bgc?: 'red' | 'white' = navOptions.TYPE_RED,
  restParams?: restParamsType
): navigationOptionsType {
  let backgroundColor;
  let textColor;
  if (bgc === navOptions.TYPE_RED) {
    backgroundColor = colors['1001'];
    textColor = colors.white;
  } else {
    backgroundColor = colors.white;
    textColor = colors['1101'];
  }
  return {
    title,
    headerTitle: (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: sizes.f4,
            fontWeight: 'normal',
            color: textColor,
          }}
        >
          {title}
        </Text>
      </View>
    ),
    headerStyle: {
      height: px2dp(88),
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      elevation: 0,
      backgroundColor,
      borderBottomWidth: 0,
    },
    headerLeft: (restParams && restParams.headerLeft) || <View />,
    headerRight: (restParams && restParams.headerRight) || <View />,
    tabBarIcon: (restParams && restParams.tabBarIcon) || <View />,
    tabBarOnPress: (restParams && restParams.tabBarOnPress) || noop(),
  };
}

navOptions.TYPE_RED = 'red';
navOptions.TYPE_WHITE = 'white';

export default navOptions;
