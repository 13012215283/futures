import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropType from 'prop-types';
import noop from 'futures/utils/noop';

import styles from './styles';

export default class ListItem extends Component {
  static defaultProps = {
    selectItem: noop(),
    bank: {},
    noBotBoder: false,
  };

  constructor(props) {
    super(props);

    const { bank } = this.props;

    this.selectItem = this.selectItem.bind(this, bank);
  }

  selectItem(bank) {
    this.props.selectItem(bank);
  }

  render() {
    const { bank, noBotBoder } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.selectItem}>
        <View style={[styles.listItem, noBotBoder ? '' : styles.botomBorder]}>
          <Text>{bank.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  bank: PropType.objectOf(PropType.object),
  noBotBoder: PropType.bool,
  selectItem: PropType.func,
};
