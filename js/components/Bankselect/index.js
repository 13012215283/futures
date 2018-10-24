import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import BankBlock from './BankBlock';
import SelectBar from './SelectBar';
import styles from './style';
import noop from '../../utils/noop';

/**
 * 锚定位列表
 * the form of data putin
 * const Data = [{ key:'#',data:[{ id:'0', name:'name' }] }]
 */

class Bankselect extends Component {
  constructor(props) {
    super(props);

    this.watcher = null;

    this.barData = [];

    this.renderItem = this.renderItem.bind(this);
    this.scrollToSelector = this.scrollToSelector.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.refreshChooseBar = this.refreshChooseBar.bind(this);
  }

  shouldComponentUpdate(props) {
    this.barData = props.data;
    return true;
  }

  componentWillUpdate() {
    this.refreshChooseBar(this.barData);
  }

  /** function of onscroll */
  onScroll = e => {
    const offset = e.nativeEvent.contentOffset.y;
    let defaultCurrent = { offset: '', text: '' };
    const current = this.barData.filter(item => item.offset >= offset).shift();
    if (current) {
      defaultCurrent = current;
    }

    this.selectBar.onPanResponderStart(defaultCurrent.text);
  };

  /** update bar */
  refreshChooseBar(data) {
    let beforeLength = 0;
    this.barData = data.map((item, index) => {
      if (index !== 0) {
        beforeLength =
          beforeLength + 23 + this.data[index - 1].data.length * 42;
      }
      return { text: item.key, offset: beforeLength };
    });

    this.selectBar.refresh(this.barData);
  }

  /** scroll to selector */
  scrollToSelector = offset => {
    this.listRef.scrollToOffset({ offset });
  };

  /** select item */
  selectItem = bank => {
    this.props.selectItem(bank);
  };

  /** function of renderItem  */
  renderItem = ({ item }) => (
    <BankBlock
      title={item.key}
      renderContent={item.data}
      selectItem={this.selectItem}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          ref={ref => {
            this.listRef = ref;
          }}
          keyExtractor={item => item}
          getItemLayout={this.getItemLayout}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          {...this.props}
        />
        <SelectBar
          ref={ref => {
            this.selectBar = ref;
          }}
          bardata={this.barData}
          scrollToSelector={this.scrollToSelector}
        />
      </View>
    );
  }
}

Bankselect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  selectItem: PropTypes.func,
};

Bankselect.defaultProps = {
  data: [],
  selectItem: noop,
};

export default Bankselect;
