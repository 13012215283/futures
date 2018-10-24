import React, { Component } from 'react';
import { View } from 'react-native';
import { navOptions, BackBtn } from 'futures/navigations';
import { colors } from 'futures/components/themes';
import { routes, errtips } from 'futures/constants';
import { Item } from 'futures/containers/Setting/Item';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';
import EditPwd from './EditPwd';
import WritePwd from './WritePwd';
import SettingPwd from './SettingPwd';

// @flow
type Props = {
  navigation: object,
};

class WithdrawPwd extends Component<Props> {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.uId = params.uId;
    this.state = {
      status: '',
    };

    this.getDataFromServer = this.getDataFromServer.bind(this);
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  async getDataFromServer() {
    try {
      const data = await request('0034', { '00': this.uId });
      this.setState({
        status: data.status,
      });
    } catch (error) {
      if (error.code in errtips) {
        Toast.show(errtips[error.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试');
      }
    }
  }

  render() {
    const { status } = this.state;
    const { navigation } = this.props;
    const { uId } = this;
    const labels = {
      0: [
        {
          label: '设置出金密码',
          route: routes.SettingPwd,
          params: { uId, operation: 'setting' },
        },
      ],
      1: [
        {
          label: '修改出金密码',
          route: routes.EditPwd,
          params: { uId },
        },
        {
          label: '忘记出金密码',
          route: routes.SettingPwd,
          params: { uId, operation: 'forget' },
        },
      ],
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors[1105],
        }}
      >
        {status
          ? labels[status].map(v => (
              <Item
                label={v.label}
                onPress={() => navigation.navigate(v.route, v.params)}
                key={v.label}
              />
            ))
          : null}
      </View>
    );
  }
}

const WithdrawPwdScreen = {
  screen: WithdrawPwd,
  navigationOptions: props =>
    navOptions('出金密码', navOptions.TYPE_RED, {
      headerLeft: <BackBtn {...props} />,
    }),
};

export { WithdrawPwdScreen, EditPwd, WritePwd, SettingPwd };
