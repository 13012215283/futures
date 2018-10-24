import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropType from 'prop-types';

import styles from './styles';
import ListItem from './ListItem';

export default class BanklistItem extends Component {
  constructor(props) {
    super(props);

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(text) {
    this.props.selectItem(text);
  }

  render() {
    const { title, renderContent } = this.props;

    const lastIndex = renderContent.length - 1;

    const contentHtml = renderContent.map((item, contindex) => (
      <ListItem
        bank={item}
        key={item.id}
        selectItem={this.selectItem}
        noBotBoder={contindex === lastIndex}
      />
    ));

    return (
      <View style={styles.listBlock}>
        <View style={styles.listBlockTitle}>
          <Text>{title}</Text>
        </View>
        {contentHtml}
      </View>
    );
  }
}

BanklistItem.propTypes = {
  selectItem: PropType.func.isRequired,
  title: PropType.string.isRequired,
  renderContent: PropType.arrayOf(PropType.object).isRequired,
};
