import React from 'react';
import {
  View,
  AsyncStorage,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { Toast } from 'futures/components/Toast';
import Dialog from 'futures/components/Dialog';
import { request } from 'futures/utils/request';
import getBanks from 'futures/utils/getBanks';
import { colors } from 'futures/components/themes';
import AccountToggleBar from './AccountToggleBar';
import DetailPanel from './DetailPanel';
import MenuBar from './MenuBar';

/* eslint-disable global-require */
const imgSet = {
  man: require('./images/my_info_icon.png'),
  heart: require('./images/collection_icon.png'),
};

const unsetChartValue = '0.00';

export default class MyAccountIndex extends React.Component {
  constructor(props) {
    super(props);
    this.uId = '';
    this.isStartWheelAsk = false;
    this.listenNum = 0;
    this.state = {
      isLogin: false,
      isRealAccount: true, // 是否为真实账户
      rmAnFlg: '', // 实名认证
      bankCardNo: '',
      bankName: '',
      bankLogo: '',
      /* 资产分类 */
      avaliableAmount: '0',
      totalAmount: '0',
      usedAmount: '0',
      pureAmount: '0',
      /* Dialog */
      alertVisible: false,
      alertContent: '',
      targetName: '', // 跳转路由名称
      dialogBtnName: '', // 跳转按钮名称,
      defaultCancelBtnName: '确定',
    };
    this.getUserFromLocal = this.getUserFromLocal.bind(this);
    this.goAssetDetail = this.goAssetDetail.bind(this);
    this.goto = this.goto.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.getDetailMount = this.getDetailMount.bind(this);
  }

  async componentDidMount() {
    try {
      this.getUserFromLocal();
      this.bankSet = await getBanks(); // 获取外部银行列表
      this.getDetailMount();
      this.timer = setInterval(() => {
        this.getDetailMount();
      }, 3000);
      this.getQulifiedStatus();
    } catch (err) {
      if (err.code) {
        Toast.show(errorTipsSet[err.code], Toast.SHORT);
      }
    }

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getQulifiedStatus();
        this.getDetailMount();
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.getDetailMount();
        }, 3000);
      }
    );

    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      () => {
        clearInterval(this.timer);
      }
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.willFocusSubscription.remove();
  }

  async getUserFromLocal() {
    // 从本地中获取user信息
    try {
      const userInfo = await AsyncStorage.multiGet(['id', 'telephone']);
      const userType = await AsyncStorage.getItem('userType');
      const [uIdInfo, telephoneInfo] = userInfo;
      const [, uId] = uIdInfo;
      const [, telephone] = telephoneInfo;
      this.uId = uId;
      this.telephone = telephone;
      this.setState({
        isLogin: typeof this.uId === 'string' && this.uId.length > 0,
        isRealAccount: userType === '1',
      });
    } catch (err) {
      /* eslint-disabled no-console */
      console.log('getUserFromLocal', err);
    }
  }

  async getDetailMount() {
    // 获取净值、已用、可用、总盈亏
    if (this.uId) {
      try {
        const amountData = await request('0018', { '00': this.uId });
        const {
          availableValue,
          usedValue,
          netValue,
          profitAndLoss,
        } = amountData;
        this.setState({
          avaliableAmount: availableValue || unsetChartValue,
          totalAmount: profitAndLoss || unsetChartValue,
          usedAmount: usedValue || unsetChartValue,
          pureAmount: netValue || unsetChartValue,
        });
      } catch (err) {
        if (err.code) {
          Toast.show(errorTipsSet[err.code], Toast.SHORT);
        }
      }
    }
  }

  async getQulifiedStatus() {
    // 获取认证信息
    if (this.uId && this.state.isRealAccount) {
      try {
        const { rmAnFlg, bankCardNo, bankName } = await request('0007', {
          '00': this.uId,
        });
        this.setState({
          rmAnFlg,
          bankCardNo,
          bankName: this.bankSet[bankName] && this.bankSet[bankName].name,
          bankLogo: this.bankSet[bankName] && this.bankSet[bankName].icon,
        });
      } catch (err) {
        if (err.code) {
          Toast.show(errorTipsSet[err.code], Toast.SHORT);
        }
      }
    }
  }

  goto(navName, params) {
    this.props.navigation.navigate(navName, {
      source: 'MyAccountIndex',
      ...params,
    });
  }

  goAssetDetail() {
    this.goto('AssetsDetail', {
      isRealAccount: true,
      uId: this.uId,
    });
  }

  openDialog(
    content,
    targetName = '',
    btnName = '',
    defaultCancelBtnName = '确定'
  ) {
    this.setState({
      alertContent: content,
      alertVisible: true,
      targetName,
      dialogBtnName: btnName,
      defaultCancelBtnName,
    });
  }

  checkUserAccountState(func, InOutMoneyType = 0) {
    // 检查账户身份认证状态,入金只要登录就行,不查身份验证状态

    const { rmAnFlg, isLogin } = this.state;
    const statusSet = {
      '0': {
        msg: '没有上传身份信息',
        tar: 'IndentyIdCardImg',
        btnContext: '去上传',
      },
      '1': { msg: '身份审核中' },
      '3': { msg: '身份认证失败' },
      '4': {
        msg: '您尚未进行过身份认证',
        tar: 'Identity',
        btnContext: '前往认证',
      },
    };

    if (isLogin) {
      if (rmAnFlg === '2' || (rmAnFlg !== '4' && InOutMoneyType === 1)) {
        // 有银行卡就能入金
        func();
      } else if (rmAnFlg === '1' && InOutMoneyType === 2) {
        // InOutMoneyType  1是入金 2是出金
        this.openDialog(`实名认证正在审核中，审核通过可以进行出金操作`);
      } else {
        const alertInfo = statusSet[rmAnFlg];
        this.openDialog(
          alertInfo.msg,
          alertInfo.tar,
          alertInfo.btnContext,
          rmAnFlg === '0' ? '取消' : '确定'
        );
      }
    } else {
      this.openDialog('请先登录', 'Login', '登录', '取消');
    }
  }

  checkIsLogin(func) {
    const { isLogin } = this.state;
    if (!isLogin) {
      this.openDialog('请先登录', 'Login', '登录', '取消');
      return;
    }

    func();
  }

  callService = () => {
    Linking.openURL('tel:022-58313111');
  };

  render() {
    const {
      isLogin,
      avaliableAmount,
      totalAmount,
      usedAmount,
      pureAmount,
      isRealAccount,
      bankCardNo,
      bankName,
      bankLogo,
      /* Dialog */
      alertContent,
      alertVisible,
      targetName,
      dialogBtnName,
      defaultCancelBtnName,
    } = this.state;
    const { uId, telephone } = this;
    const realAccountEvent = [
      () =>
        this.checkUserAccountState(
          () =>
            this.goto('Withdraw', {
              uId,
              isRealAccount,
              bankCardNo,
              bankName,
              bankLogo,
            }),
          1
        ),
      () =>
        this.checkUserAccountState(
          () =>
            this.goto('Deposits', {
              uId,
              bankCardNo,
              bankName,
              bankLogo,
            }),
          2
        ),
    ];
    const vituralAccountEvent = [
      () => {
        this.props.navigation.navigate('AssetsDetail', { isRealAccount, uId });
      },
      () => {
        this.openDialog(
          () => (
            <Text>
              <Text>可以拨打客服热线</Text>
              <TouchableWithoutFeedback onPress={this.callService}>
                <Text
                  style={{
                    color: colors['1004'],
                    textDecorationLine: 'underline',
                  }}
                >
                  022-58313111
                </Text>
              </TouchableWithoutFeedback>
              <Text>咨询产品信息详情</Text>
            </Text>
          ),
          '',
          '',
          '我知道了'
        );
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <AccountToggleBar
          isLogin={isLogin}
          goLogin={() => this.goto('Login')}
          telephone={telephone}
          uId={uId}
          goAssetDetail={this.goAssetDetail}
          isRealAccount={isRealAccount}
        />
        <ScrollView style={{ flex: 1 }}>
          <DetailPanel
            isLogin={isLogin}
            avaliableAmount={avaliableAmount}
            totalAmount={totalAmount}
            usedAmount={usedAmount}
            pureAmount={pureAmount}
            btnEvents={
              isRealAccount || !isLogin ? realAccountEvent : vituralAccountEvent
            }
            isRealAccount={isRealAccount || !isLogin}
          />
          {(isRealAccount || !isLogin) && (
            <MenuBar
              onPress={() =>
                this.checkIsLogin(() => {
                  this.goto('PersonalDetails', { uId });
                })
              }
              title="个人信息"
              uri={imgSet.man}
            />
          )}
          <MenuBar
            onPress={() =>
              this.checkIsLogin(() => this.goto('Collection', { uId }))
            }
            title="我的收藏"
            uri={imgSet.heart}
          />
          <Dialog
            content={alertContent}
            button={[
              {
                name: defaultCancelBtnName,
                callback: () => {
                  this.setState({ alertVisible: false });
                },
              },
              dialogBtnName && {
                name: dialogBtnName,
                callback: () => {
                  this.goto(targetName, { uId: this.uId });
                  this.setState({ alertVisible: false });
                },
              },
            ]}
            visible={alertVisible}
          />
        </ScrollView>
      </View>
    );
  }
}

MyAccountIndex.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};

const errorTipsSet = {
  GET_BANKS_FAILED: '获取银行列表出错',
  USER_NOT_EXITS: '用户不存在，请重新登录',
};
