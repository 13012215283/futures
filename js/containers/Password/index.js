import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast } from 'futures/components/Toast';
import { navOptions, BackBtn } from 'futures/navigations';
import { colors } from 'futures/components/themes';
import { request } from 'futures/utils/request';
import { errtips, routes } from 'futures/constants';
import { Item } from 'futures/containers/Setting/Item';
import Dialog from 'futures/components/Dialog';

// @flow
type Props = {
  navigation: object,
};

class Password extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
    };
    const { params } = this.props.navigation.state;
    this.uId = params.uId;
    this.renderDialog = this.renderDialog.bind(this);
  }

  componentDidMount() {
    this.getAuthState();
  }

  /** 获取认证状态 */
  async getAuthState() {
    const body = { '00': this.uId };
    try {
      const data = await request('0007', body);
      this.authState = data.rmAnFlg;
    } catch (error) {
      if (error.code in errtips) {
        Toast.show(errtips[error.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }

  /** 渲染弹窗 */
  renderDialog() {
    const { uId } = this;
    const { navigation } = this.props;
    return (
      <Dialog
        visible={this.state.dialogVisible}
        content="您尚未进行身份认证"
        button={[
          {
            name: '确定',
            callback: () => {
              this.setState({ dialogVisible: false });
            },
          },
          {
            name: '前往认证',
            callback: () => {
              this.setState({ dialogVisible: false });
              navigation.navigate(routes.Identity, { uId });
            },
          },
        ]}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { uId } = this;
    return (
      <View style={style.container}>
        <Item
          label="修改登录密码"
          onPress={() => navigation.navigate(routes.ChangePwd, { uId })}
        />
        <Item
          label="出金密码"
          onPress={() => {
            if (this.authState === '4') {
              this.setState({ dialogVisible: true });
              return;
            }

            navigation.navigate(routes.WithdrawPwd, { uId });
          }}
        />
        {/* {this.renderDialog()} */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[1105],
  },
});

export default {
  screen: Password,
  navigationOptions: props =>
    navOptions('密码管理', navOptions.TYPE_RED, {
      headerLeft: <BackBtn {...props} />,
    }),
};
