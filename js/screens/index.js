import React from 'react';
import TabBar from 'futures/containers/TabBar';
import Login from 'futures/containers/Login';
import { QRScanner, ConfirmLogin } from 'futures/containers/QRScanner';
import Regist from 'futures/containers/Regist';
import ForgotPwd from 'futures/containers/ForgotPwd';
import { navOptions } from 'futures/navigations';
import GoodsTab from 'futures/containers/GoodsTab';
import ProductNav from 'futures/containers/Products/ProductNav';
import Address from 'futures/containers/Address';
import AddAddress from 'futures/containers/AddAddress';
import OpenPosition from 'futures/containers/OpenPosition';
import OpenPositionDelivery from 'futures/containers/OpenPosition/delivery';
import BackBtn from 'futures/navigations/BackBtn';
import NavBtn from 'futures/navigations/NavBtn';
import EditBtn from 'futures/navigations/EditBtn';
import Setting from 'futures/containers/Setting';
import ChangePwd from 'futures/containers/ChangePwd';
import Message from 'futures/containers/Message';
import InviteCode from 'futures/containers/InviteCode';
import Entrust from 'futures/containers/Entrust';
import AllworksTabs from 'futures/containers/Allworks';
import EveningUp from 'futures/containers/EveningUp';
import PurchasePayment from 'futures/containers/PurchasePayment';
import TailPayment from 'futures/containers/TailPayment';
import Identity from 'futures/containers/Identity';
import BankPage from 'futures/containers/BankPage';
import ProductIndentiPic from 'futures/containers/ProductIndentiPic';
import IndentyIdCardImg from 'futures/containers/IndentyIdCardImg';
import FullScreenMarket from 'futures/containers/FullScreenMarket';
import SecondCategory from 'futures/containers/SecondCategory';
import ProductList from 'futures/containers/ProductList';
import PersonalDetails from 'futures/containers/PersonalDetails';
import FuturesMarket from 'futures/containers/FuturesMarket';
import Password from 'futures/containers/Password';
import DeliverySchedule from 'futures/containers/DeliverySchedule';
import {
  WithdrawPwdScreen as WithdrawPwd,
  SettingPwd,
  EditPwd,
  WritePwd,
} from 'futures/containers/WithdrawPwd';
import {
  OutMoney,
  InMoney,
  InMoneySuccess,
  OutMoneySuccess,
  AssetsDetail,
  OutMoneyProgress,
} from 'futures/containers/InOutMoney';
import Collection from 'futures/containers/Collection';
import BannerWebView from 'futures/containers/BannerWebView';
import Search from 'futures/containers/Search';
import { colors } from 'futures/components/themes';

export default {
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) =>
      navOptions('登 录', navOptions.TYPE_WHITE, {
        headerLeft: (
          <BackBtn navigation={navigation} textStyle={{ color: '#212121' }} />
        ),
      }),
  },
  Regist: {
    screen: Regist,
    navigationOptions: () => navOptions('注 册', navOptions.TYPE_WHITE),
  },
  QRScanner: {
    screen: QRScanner,
    navigationOptions: ({ navigation }) =>
      navOptions('扫一扫', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  ConfirmLogin: {
    screen: ConfirmLogin,
    navigationOptions: ({ navigation }) =>
      navOptions('扫码登录', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  ForgotPwd: {
    screen: ForgotPwd,
    navigationOptions: ({ navigation }) =>
      navOptions('忘记密码', navOptions.TYPE_WHITE, {
        headerLeft: (
          <BackBtn
            navigation={navigation}
            textStyle={{ color: colors.black }}
          />
        ),
      }),
  },
  GoodsTab: {
    screen: GoodsTab,
    navigationOptions: props => ({
      header: <ProductNav {...props} />,
    }),
  },
  FuturesMarket: {
    screen: FuturesMarket,
    navigationOptions: ({ navigation }) =>
      navOptions('电子盘', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },

  OpenPosition: {
    screen: OpenPosition,
    path: 'dealHall/:operation',
  },
  OpenPositionDelivery: {
    screen: OpenPositionDelivery,
    path: 'dealHall/:operation',
  },

  TabBar: {
    screen: TabBar,
  },
  Address: {
    screen: Address,
    navigationOptions: props =>
      navOptions('地址管理', navOptions.TYPE_RED, {
        headerLeft: <BackBtn {...props} />,
      }),
  },
  AddAddress: {
    screen: AddAddress,
  },
  FullScreenMarket: {
    screen: FullScreenMarket,
    navigationOptions: {
      header: null,
    },
  },
  DeliverySchedule: {
    screen: DeliverySchedule,
    navigationOptions: props =>
      navOptions('交割进度', navOptions.TYPE_RED, {
        headerLeft: <BackBtn {...props} />,
      }),
  },
  Business: {
    screen: AllworksTabs,
  },
  EveningUp: {
    screen: EveningUp,
    navigationOptions: ({ navigation }) =>
      navOptions('平仓', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  PurchasePayment: {
    screen: PurchasePayment,
    navigationOptions: ({ navigation }) =>
      navOptions('补采购款', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  TailPayment: {
    screen: TailPayment,
    navigationOptions: ({ navigation }) =>
      navOptions('补尾款', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  Identity: {
    screen: Identity,
    navigationOptions: ({ navigation }) =>
      navOptions(
        '身份认证',
        'red',
        navigation.state.params.source !== 'Regist' && {
          headerLeft: <BackBtn navigation={navigation} />,
        }
      ),
  },
  BankPage: {
    screen: BankPage,
    navigationOptions: ({ navigation }) =>
      navOptions('选择银行', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  ProductIndentiPic: {
    screen: ProductIndentiPic,
    navigationOptions: {
      header: null,
    },
  },
  IndentyIdCardImg: {
    screen: IndentyIdCardImg,
    navigationOptions: ({ navigation }) =>
      navOptions('身份验证', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  PersonalDetails,
  Setting,
  ChangePwd,
  Message,
  InviteCode,
  Password,
  WithdrawPwd,
  SettingPwd,
  WritePwd,
  EditPwd,
  Entrust: {
    screen: Entrust,
  },
  SecondCategory: {
    screen: SecondCategory,
    navigationOptions: ({ navigation }) =>
      navOptions('商品分类', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  ProductList: {
    screen: ProductList,
    navigationOptions: ({ navigation }) =>
      navOptions('商品列表', 'red', {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  /* “我的”账户 */
  Withdraw: {
    screen: InMoney,
    navigationOptions: ({ navigation }) =>
      navOptions('入 金', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
        headerRight: (
          <NavBtn
            navigation={navigation}
            navName={
              navigation.state.params.isRealAccount ? '金额明细' : '资金明细'
            }
            tarNav="AssetsDetail"
            params={{
              isRealAccount: navigation.state.params.isRealAccount,
              uId: navigation.state.params.uId,
            }}
          />
        ),
      }),
  },
  Deposits: {
    screen: OutMoney,
    navigationOptions: ({ navigation }) =>
      navOptions('出 金', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
        headerRight: (
          <NavBtn
            navigation={navigation}
            navName="出金进度"
            tarNav="OutMoneyProgress"
            params={{ uId: navigation.state.params.uId }}
          />
        ),
      }),
  },
  InMoneySuccess: {
    screen: InMoneySuccess,
    navigationOptions: () => navOptions('入金成功', navOptions.TYPE_RED),
  },
  OutMoneySuccess: {
    screen: OutMoneySuccess,
    navigationOptions: () => navOptions('出金成功', navOptions.TYPE_RED),
  },
  OutMoneyProgress: {
    screen: OutMoneyProgress,
    navigationOptions: ({ navigation }) =>
      navOptions('出金进度', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  AssetsDetail: {
    screen: AssetsDetail,
  },
  Collection: {
    screen: Collection,
    navigationOptions: ({ navigation }) =>
      navOptions('我的收藏', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
        headerRight: <EditBtn navigation={navigation} />,
      }),
  },
  BannerWebView: {
    screen: BannerWebView,
    navigationOptions: ({ navigation }) =>
      navOptions('', navOptions.TYPE_RED, {
        headerLeft: <BackBtn navigation={navigation} />,
      }),
  },
  Search: {
    screen: Search,
  },
};
