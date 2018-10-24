import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
  // AsyncStorage,
} from 'react-native';

import { getStorageData } from 'futures/utils/getStorageData';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

// @flow
type Props = {
  navigation: Object,
};
export default class IndexNav extends Component<Props> {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      // isRealAccount: true,
    };
    this.goToLogin = this.goToLogin.bind(this);
    this.scanQR = this.scanQR.bind(this);
  }

  componentDidMount() {
    // this.getUserInfo();
    getStorageData('token').then(token => {
      this.setState({
        showLogin: !token,
      });
    });
  }

  // async getUserInfo() {
  //   const userType = await AsyncStorage.getItem('userType');
  //   this.setState({
  //     isRealAccount: userType === '1',
  //   });
  // }

  scanQR() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('QRScanner');
        }}
      >
        <View>
          <Text style={[styles.font]}>&#xe790;</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  goToSearch = () => {
    this.props.navigation.navigate('Search');
  };

  loginBtn() {
    if (!this.state.showLogin) {
      return null;
    }
    return (
      <TouchableWithoutFeedback onPress={this.goToLogin}>
        <View>
          <Text style={[styles.font]}>&#xe801;</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    // const { isRealAccount, showLogin } = this.state;
    return (
      <View style={styles.navContainer}>
        {this.loginBtn()}
        <TouchableWithoutFeedback onPress={this.goToSearch}>
          <View style={styles.inputView}>
            <Text style={[styles.font, styles.searchBtn]}>&#xe805;</Text>
            <TextInput
              placeholder="请输入期货名称或ID号"
              placeholderTextColor={colors['1103']}
              style={styles.searchInput}
              underlineColorAndroid="transparent"
              editable={false}
            />
          </View>
        </TouchableWithoutFeedback>
        {/* TODO 以后说不定还要打开 */}
        {/* {isRealAccount && !showLogin && this.scanQR()} */}
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
    alignItems: 'center',
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    paddingTop: Platform.OS === 'ios' ? 20 + px2dp(16) : px2dp(16),
    paddingBottom: px2dp(16),
  },
  inputView: {
    flex: 1,
    height: '100%',
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
