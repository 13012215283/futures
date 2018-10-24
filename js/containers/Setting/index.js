import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Dialog from 'futures/components/Dialog';
import { Toast } from 'futures/components/Toast';
import { navOptions, BackBtn } from 'futures/navigations';
import { request } from 'futures/utils/request';
import { apis, errors, routes } from 'futures/constants';

import { Item, LogOutBtn } from './Item';
import style from './style';

// 清除原有的路由记录
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'TabBar',
    }),
  ],
});

// @flow
type Props = {
  navigation: object,
};

/* eslint-disable no-console */
class Setting extends Component<Props> {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      dialogVisible: false,
    };
    this.uId = params.uId;
    this.logout = this.logout.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const userInfo = await AsyncStorage.multiGet([
        'id',
        'token',
        'deviceId',
        'userType',
      ]);
      const [[, id], [, token], [, deviceId], [, userType]] = userInfo;

      this.setState({
        id,
        token,
        deviceId,
        userType,
      });
    } catch (e) {
      Toast.show('未知错误，请稍后重试');
    }
  }

  setModalVisible(visible) {
    this.setState({ dialogVisible: visible });
  }

  async logout() {
    try {
      const { id, token, deviceId } = this.state;
      const body = {
        '00': id,
        '01': token,
        '02': deviceId,
      };

      await request(apis.UserC_signOut, body);

      AsyncStorage.clear();
      this.props.navigation.dispatch(resetAction);
    } catch (e) {
      if (e.code === errors.ERROR) {
        Toast.show('未知错误', Toast.SHORT);
      }
      console.error(e);
    }
  }

  render() {
    const { navigation } = this.props;
    const { uId, setModalVisible, logout } = this;
    const { userType } = this.state;
    const settings = {
      1: [
        {
          label: '密码管理',
          route: routes.Password,
          params: { uId },
        },
        {
          label: '收货地址',
          route: routes.Address,
          params: { uId },
        },
      ],
      0: [
        {
          label: '修改登录密码',
          route: routes.ChangePwd,
          params: { uId },
        },
      ],
    };

    return (
      <View style={style.container}>
        {userType
          ? settings[userType].map(v => (
              <Item
                label={v.label}
                onPress={() => navigation.navigate(v.route, v.params)}
                key={v.label}
              />
            ))
          : null}

        <View style={style.btnPosition}>
          <LogOutBtn
            text="退出登录"
            onPress={() => this.setModalVisible(true)}
          />
        </View>
        <Dialog
          visible={this.state.dialogVisible}
          content="您确定退出吗?"
          button={[
            {
              name: '取消',
              callback() {
                setModalVisible(false);
              },
            },
            {
              name: '确定',
              callback() {
                setModalVisible(false);
                logout();
              },
            },
          ]}
        />
      </View>
    );
  }
}

export default {
  screen: Setting,
  navigationOptions: props =>
    navOptions('设置', navOptions.TYPE_RED, {
      headerLeft: <BackBtn {...props} />,
    }),
};
