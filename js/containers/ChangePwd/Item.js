import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors } from 'futures/components/themes';
import style from './style';

// @flow
type Props = {
  label: string,
};

class Item extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const { label, ...props } = this.props;
    const { isVisible } = this.state;
    return (
      <View style={style.itemContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          style={style.input}
          placeholderTextColor={colors[1103]}
          placeholder={label}
          secureTextEntry={!isVisible}
          {...props}
        />
        <TouchableOpacity
          onPress={() => this.setState({ isVisible: !this.state.isVisible })}
        >
          <Text
            style={{
              fontSize: px2dp(44),
              color: isVisible ? colors[1001] : colors[1103],
              fontFamily: 'iconfont',
            }}
          >
            {isVisible ? <Text>&#xe7f9;</Text> : <Text>&#xe7fa;</Text>}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Item;
