import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import getBanks from 'futures/utils/getBanks';

import { Toast } from 'futures/components/Toast';
import errtips from 'futures/constants/errtips';
import Bankselect from 'futures/components/Bankselect';

export default class BankPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listdata: [],
    };

    this.selectItem = this.selectItem.bind(this);
    this.getBankData = this.getBankData.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.getBankData();
  }

  /** get inform of banks */
  async getBankData() {
    try {
      const bankData = await getBanks();
      const listdata = this.formatData(bankData);
      this.setState({ listdata });
    } catch (err) {
      Toast.show(errtips[err.code], Toast.SHORT);
    }
  }

  /** formate DATA  */
  formatData = data => {
    const listItem = { key: '#' };
    const DATA = [];

    listItem.data = Object.keys(data).map(item => {
      const { name } = data[item];
      return { id: item, name };
    });

    DATA.push(listItem);

    return DATA;
  };

  selectItem(bank) {
    this.props.navigation.goBack();
    DeviceEventEmitter.emit('changeBankName', bank);
  }

  render() {
    const { listdata } = this.state;
    return <Bankselect data={listdata} selectItem={this.selectItem} />;
  }
}

BankPage.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};
