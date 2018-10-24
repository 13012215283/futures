import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { navOptions } from 'futures/navigations';
import BackBtn from 'futures/navigations/BackBtn';
import Button from '../../components/Button';
import style from './style';
import { colors } from '../../components/themes';
import { px2dp } from '../../utils/px2dp';

// @flow
type Props = {
  navigation: Object,
};

export default class Entrust extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const title = {
      GoLong: '委托买入',
      GoShort: '委托卖出',
    };
    const { params } = navigation.state;
    return navOptions(title[params.operation], navOptions.TYPE_RED, {
      headerLeft: <BackBtn navigation={navigation} />,
    });
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'TabBar' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('委托');
  }

  render() {
    const {
      productInfo,
      operation,
      time,
      num,
      price,
    } = this.props.navigation.state.params;

    const { gdsName: productName, gdsId: transitionNum } = productInfo;

    let info = '';

    switch (operation) {
      case 'GoLong':
        info = '买入';
        break;
      case 'GoShort':
        info = '卖出';
        break;
      default:
        break;
    }

    return (
      <View style={style.container}>
        <View style={style.contentContainer}>
          <View style={style.successInfo}>
            <Text style={style.successIcon}>&#xe6d6;</Text>
            <Text style={style.successText}>委托成功！</Text>
          </View>

          <View style={style.orderContainer}>
            <View style={style.productName}>
              <Text style={style.nameText}>{productName}</Text>
              <Button
                type="status"
                subStatus="writeIn"
                text={transitionNum}
                containerStyle={{
                  borderColor: colors[1001],
                  height: px2dp(36),
                }}
                textStyle={{
                  color: colors[1001],
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                disabled
              />
            </View>
            <View style={style.itemContainer}>
              <Text style={style.itemType}>委托时间</Text>
              <Text style={style.itemInfo}>{time}</Text>
            </View>
            {/* <View style={style.itemContainer}>
              <Text style={style.itemType}>委托权益号</Text>
              <Text style={style.itemInfo}>{id}</Text>
            </View> */}
            <View style={style.itemContainer}>
              <Text style={style.itemType}>交易数</Text>
              <Text style={style.itemInfo}>
                委托{info}
                <Text style={{ color: colors[1001] }}>{num}</Text>
                手
              </Text>
            </View>
            <View style={style.itemContainer}>
              <Text style={style.itemType}>委托价格</Text>
              <Text style={style.itemInfo}>{price}</Text>
            </View>
          </View>
        </View>

        <Button
          type="primary"
          subStatus="enable"
          text="查看委托"
          onPress={this.onPress}
        />
      </View>
    );
  }
}
