import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import Button from 'futures/components/Button';
import { BankBar } from './BankComponent';

/* 入金、出金中输入金额的组件 */
export default class InputMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      isValid: false,
    };

    this.isInMoney = this.props.navigation.state.routeName === 'Withdraw';

    this.onTextInput = this.onTextInput.bind(this);
    this.putAllMoney = this.putAllMoney.bind(this);
  }

  onTextInput(inputText) {
    this.setState({ inputText }, () => this.validation());
  }

  putAllMoney() {
    // 填入全部可用金
    this.setState(
      {
        inputText: this.props.avaliableMoney,
      },
      () => this.validation()
    );
  }

  validation() {
    const { inputText } = this.state;
    if (Number(inputText) > 0) {
      // 验证，输入金额大于0，且为数字
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  render() {
    const { avaliableMoney, bankName, cardId, bankLogo } = this.props;
    const { inputText, isValid } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: colors[1105] }}>
        <BankBar
          isInMoney={this.isInMoney}
          bankName={bankName}
          cardId={cardId}
          bankLogo={bankLogo}
        />
        <View style={[styles.container, styles.globalPadding]}>
          <Text style={styles.title}>
            {this.isInMoney ? '入金金额' : '出金金额'}
          </Text>
          <View style={styles.inputWrapper}>
            <View>
              <Text
                style={{
                  fontSize: px2dp(60),
                  color: colors[1101],
                }}
              >
                ￥
              </Text>
            </View>
            <View style={{ height: px2dp(120), flex: 1 }}>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                selectionColor="red"
                underlineColorAndroid="transparent"
                onChangeText={value => this.onTextInput(value)}
                value={inputText}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={{ color: colors[1103], fontSize: sizes.f1 }}>
              当前可用金额<Text
                style={{
                  color: colors[this.isInMoney ? 1103 : 1001],
                  fontSize: sizes.f1,
                }}
              >
                ￥{avaliableMoney}
              </Text>
            </Text>
            {!this.isInMoney && (
              <TouchableOpacity
                style={styles.btnWrapper}
                onPress={this.putAllMoney}
              >
                <Text style={{ color: '#0004ff', fontSize: px2dp(24) }}>
                  填入
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Button
          text={this.isInMoney ? '入 金' : '出 金'}
          type="primary"
          subStatus={isValid ? 'enable' : 'disable'}
          containerStyle={[styles.globalPadding, { marginTop: px2dp(128) }]}
          onPress={() => this.props.onBtnPress(inputText)}
          disabled={!isValid}
        />
        <View style={[styles.globalPadding, { marginTop: px2dp(21) }]}>
          <Text style={styles.warningText}>
            {this.isInMoney
              ? '温馨提示：入金成功后，银联将收取入金金额的8%作为手续费'
              : '温馨提示：账户可用资金过低将会有爆仓的风险，建议您谨慎操作，尽量预留足够的可用金额，避免不必要的损失。'}
          </Text>
        </View>
      </View>
    );
  }
}

InputMoney.propTypes = {
  avaliableMoney: PropTypes.string.isRequired, // 可用金额
  onBtnPress: PropTypes.func.isRequired, // 点击按钮
  bankName: PropTypes.string.isRequired, // 银行名
  cardId: PropTypes.string.isRequired, // 银行卡号尾数
  bankLogo: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  globalPadding: {
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  container: {
    height: px2dp(252),
    marginTop: px2dp(32),
    paddingTop: px2dp(32),
    backgroundColor: colors.white,
  },
  title: {
    fontSize: sizes.f3,
    color: colors[1101],
  },
  inputWrapper: {
    marginTop: px2dp(20),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors[1104],
    alignItems: 'center',
    height: px2dp(85),
  },
  textInput: {
    fontSize: px2dp(55),
    color: colors[1101],
    paddingLeft: 0,
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnWrapper: {
    marginLeft: px2dp(15),
    width: px2dp(90),
    height: px2dp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px2dp(1),
    borderColor: '#0004FF',
    borderRadius: px2dp(20),
  },
  warningText: {
    fontSize: sizes.f0,
    color: colors[1103],
    textAlign: 'center',
  },
});
