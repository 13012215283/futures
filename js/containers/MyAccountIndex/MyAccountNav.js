import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  AsyncStorage,
  Platform,
} from 'react-native';
import Dialog from 'futures/components/Dialog';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
// @flow
/* type Props = {
  navigation: Object,
}; */
export default class IndexNav extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      /* Dialog */
      alertContent: '',
      alertVisible: false,
      dialogBtnName: '',
      targetName: '',
    };
    this.getUserFromLocal = this.getUserFromLocal.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.settingBtn = this.settingBtn.bind(this);
    this.mailbox = this.mailbox.bind(this);
  }

  componentDidMount() {
    this.getUserFromLocal();
  }

  async getUserFromLocal() {
    // 从本地中获取user信息
    try {
      const userInfo = await AsyncStorage.multiGet(['id', 'telephone']);
      const [uIdInfo] = userInfo;
      const [, uId] = uIdInfo;
      this.uId = uId;
      this.setState({
        isLogin: typeof this.uId === 'string' && this.uId.length > 0,
      });
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
    }
  }

  settingBtn() {
    const { uId } = this;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.checkIsLogin(() =>
            this.props.navigation.navigate('Setting', { uId })
          );
        }}
      >
        <View>
          <Text style={[styles.font]}>&#xe80d;</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  mailbox() {
    return (
      <Text
        style={[styles.font]}
        onPress={() => {
          this.checkIsLogin(() =>
            this.props.navigation.navigate('Message', { uId: this.uId })
          );
        }}
      >
        &#xe809;
      </Text>
    );
  }

  checkIsLogin(func) {
    const { isLogin } = this.state;
    if (!isLogin) {
      this.setState({
        alertContent: '请先登录',
        alertVisible: true,
        targetName: 'Login',
        dialogBtnName: '去登录',
      });
    } else {
      func();
    }
  }

  render() {
    const {
      alertContent,
      alertVisible,
      dialogBtnName,
      targetName,
    } = this.state;
    return (
      <View style={styles.navContainer}>
        {this.settingBtn()}
        <Dialog
          content={alertContent}
          button={[
            {
              name: '取消',
              callback: () => {
                this.setState({ alertVisible: false });
              },
            },
            dialogBtnName && {
              name: dialogBtnName,
              callback: () => {
                this.props.navigation.navigate(targetName, { uId: this.uId });
                this.setState({ alertVisible: false });
              },
            },
          ]}
          visible={alertVisible}
        />
        {this.mailbox()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'iconfont',
    fontSize: px2dp(44),
    color: colors.white,
  },
  navContainer: {
    height: Platform.OS === 'ios' ? 20 + px2dp(88) : px2dp(88),
    backgroundColor: colors['1001'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    paddingTop: Platform.OS === 'ios' ? 20 + px2dp(16) : px2dp(16),
    paddingBottom: px2dp(16),
  },
  inputView: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: px2dp(32),
    marginRight: px2dp(32),
    borderRadius: px2dp(28),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    fontSize: px2dp(30),
    color: colors['1001'],
    marginLeft: px2dp(16),
    marginRight: px2dp(16),
  },
  searchInput: {
    padding: 0,
    flex: 1,
    fontSize: sizes.f2,
  },
});
