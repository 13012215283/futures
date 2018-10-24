import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import BumpedContainer from 'futures/components/BumpedContainer';
import Columninput from 'futures/components/Input/Columninput';
import Skipinput from 'futures/components/Input/Skipinput';
import Button from 'futures/components/Button';
import Dialog from 'futures/components/Dialog';
import EventListener from 'futures/utils/EventListener';
import {
  testBankCard,
  testIDCards,
  testPhone,
} from 'futures/utils/informValidTest';
import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import { request } from 'futures/utils/request';

import styles from './style';

export default class Identity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bank: {},
      alertHeader: '',
      alertContent: '',
      alertVisible: false,
      inputNull: true,
    };

    this.uId = '';
    this.ifPass = false;

    /** operation to commit information */
    this.checkValidity = this.checkValidity.bind(this);
    this.checkBankInform = this.checkBankInform.bind(this);
    this.IdentityCertify = this.IdentityCertify.bind(this);
    this.getPersonInfo = this.getPersonInfo.bind(this);

    /** operation to select Bank */
    this.skipToBank = this.skipToBank.bind(this);
    this.changeBankName = this.changeBankName.bind(this);

    /** operation to all layers:Dialog */
    this.showAlert = this.showAlert.bind(this);

    /** other opration */
    this.inputTextIsNull = this.inputTextIsNull.bind(this);
  }

  componentWillMount() {
    const event = {
      changeBankName: this.changeBankName,
      inputTextIsNull: this.inputTextIsNull,
    };

    EventListener.addEventListen(event);
  }

  componentDidMount() {
    this.uId = this.props.navigation.state.params.uId;
    // this.uId = '100001';
  }

  componentWillUnmount() {
    EventListener.clearEventListen();
  }

  /** get personInfo */
  getPersonInfo() {
    const { bank } = this.state;
    const personInfo = {};
    personInfo.uId = this.uId;
    personInfo.bankName = bank.name;
    personInfo.bankId = bank.id;
    personInfo.realName = this.realName.getValue();
    personInfo.IdCard = this.IdCard.getValue();
    personInfo.bankNum = this.bankNum.getValue();
    personInfo.phoneNum = this.phoneNum.getValue();

    return personInfo;
  }

  /** change BankName Emitter  */
  changeBankName(bank) {
    this.setState({ bank });
  }

  skipToBank() {
    this.props.navigation.navigate('BankPage');
  }

  /** check if input is null  */
  inputTextIsNull() {
    const personInfo = this.getPersonInfo();

    const personVal = Object.keys(personInfo).map(item => personInfo[item]);

    const inputNull = personVal.includes('');

    this.setState({ inputNull });
  }

  /** press of nextstep button */
  IdentityCertify() {
    const personInfo = this.getPersonInfo();

    if (this.checkValidity(personInfo)) {
      this.checkBankInform(personInfo);
    }
  }

  /** check input validity */
  checkValidity(obj) {
    const { IdCard, bankNum, phoneNum, bankName } = obj;

    let warnText = '';
    if (!testIDCards(IdCard)) {
      warnText = '请输入正确的身份证号!';
    }

    if (!testBankCard(bankNum)) {
      warnText = '请输入正确的银行卡号!';
    }

    if (!testPhone(phoneNum)) {
      warnText = '请输入正确的手机号码!';
    }

    if (bankName === '') {
      warnText = '请输入所属银行!';
    }

    if (warnText !== '') {
      this.showAlert('', warnText);
      return false;
    }

    return true;
  }

  /** check bank inform */
  checkBankInform = async obj => {
    const { uId, realName, IdCard, bankNum, phoneNum, bankId } = obj;

    const body = {
      '00': uId,
      '15': realName,
      '16': IdCard,
      '18': bankNum,
      '09': phoneNum,
      '17': bankId,
    };

    try {
      const result = await request('0001', body);
      if (result === 0) {
        this.ifPass = true;
        this.showAlert('', '身份验证成功，进入添加证件照页面');
      }
    } catch (err) {
      Toast.show(errtips[err.code], Toast.SHORT);
    }
  };

  /** show Alert */
  showAlert(title, content) {
    this.setState({
      alertHeader: title,
      alertContent: content,
      alertVisible: true,
    });
  }

  render() {
    const {
      alertContent,
      alertHeader,
      alertVisible,
      inputNull,
      bank,
    } = this.state;
    return (
      <BumpedContainer initPos={45} bumptPos={-18}>
        <View style={styles.inputBlock}>
          <View style={styles.inputBTitle}>
            <Text style={styles.inputBText}>个人信息</Text>
          </View>
          <View>
            <Columninput
              placeholder="请输入真实姓名"
              ref={ref => {
                this.realName = ref;
              }}
            />
            <Columninput
              placeholder="请输入身份证号"
              ref={ref => {
                this.IdCard = ref;
              }}
            />
          </View>
        </View>
        <View style={styles.inputBlock}>
          <View style={styles.inputBTitle}>
            <Text style={styles.inputBText}>银行卡</Text>
          </View>
          <View>
            <Skipinput
              title="请选择银行"
              value={bank.name}
              skipTo={this.skipToBank}
            />
            <Columninput
              placeholder="请输入银行卡号"
              ref={ref => {
                this.bankNum = ref;
              }}
            />
            <Columninput
              placeholder="请输入预留手机号"
              ref={ref => {
                this.phoneNum = ref;
              }}
            />
          </View>
        </View>
        <Button
          type="primary"
          text="提交"
          subStatus={inputNull ? 'disable' : 'enable'}
          containerStyle={styles.nextBtn}
          onPress={!inputNull && this.IdentityCertify}
        />
        <Dialog
          content={alertContent}
          header={alertHeader}
          button={[
            {
              name: '确定',
              callback: () => {
                if (this.ifPass) {
                  this.props.navigation.replace('IndentyIdCardImg', {
                    uId: this.uId,
                  });
                }
                this.setState({ alertVisible: false });
              },
            },
          ]}
          visible={alertVisible}
        />
      </BumpedContainer>
    );
  }
}

Identity.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
