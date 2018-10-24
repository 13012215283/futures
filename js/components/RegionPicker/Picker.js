import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

const { f2 } = sizes;

// @flow
type Props = {};

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["stateFromProps"] }] */
export default class Picker extends Component<Props> {
  static Item = () => null;

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(this.props);
    this.select = this.select.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  shouldComponentUpdate(nextProps, nextState, context) {
    return (
      JSON.stringify([
        {
          selectedIndex: nextState.selectedIndex,
          items: nextState.items,
          pickerStyle: nextState.pickerStyle,
          itemStyle: nextState.itemStyle,
          onValueChange: nextState.onValueChange,
        },
        context,
      ]) !==
      JSON.stringify([
        {
          selectedIndex: this.state.selectedIndex,
          items: this.state.items,
          pickerStyle: this.state.pickerStyle,
          itemStyle: this.state.itemStyle,
          onValueChange: this.state.onValueChange,
        },
        this.context,
      ])
    );
  }

  onValueChange() {
    const currentItem = this.state.items[this.state.selectedIndex];
    if (currentItem && this.state.onValueChange) {
      this.state.onValueChange(currentItem.value, currentItem.label);
    }
  }

  stateFromProps(props) {
    let selectedIndex = '';
    const items = [];
    const { pickerStyle, itemStyle, onValueChange } = props;

    React.Children.forEach(props.children, (child, index) => {
      // eslint-disable-next-line
      child.props.value === props.selectedValue && (selectedIndex = index);
      items.push({ value: child.props.value, label: child.props.label });
    });

    return {
      selectedIndex,
      items,
      pickerStyle,
      itemStyle,
      onValueChange,
    };
  }

  select(selectedIndex) {
    this.setState({ selectedIndex }, () => {
      this.onValueChange();
    });
  }

  render() {
    const { selectedIndex, items } = this.state;
    return (
      <ScrollView>
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          let textStyle = [style.pickerItem];
          if (isSelected) {
            textStyle = textStyle.concat([style.selectedItem]);
          }
          return (
            <Text
              style={textStyle}
              onPress={() => this.select(index)}
              // eslint-disable-next-line
              key={index}
            >
              {item.label}
            </Text>
          );
        })}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  pickerItem: {
    height: px2dp(88),
    backgroundColor: 'transparent',
    fontSize: f2,
    color: colors[1102],
    textAlignVertical: 'center',
    width: '100%',
  },
  selectedItem: {
    color: colors[1001],
  },
});
