import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { colors, sizes } from '../../components/themes';
import { px2dp } from '../../utils/px2dp';

class ListItem extends Component {
  render() {
    const { data, onPress } = this.props;
    return (
      <View>
        <Text style={style.companyInfo}>{data.name}</Text>
        <View style={style.concatContainer}>
          <Text style={style.word}>联系方式：</Text>
          <TouchableNativeFeedback
            onPress={() => {
              // 点击设置要拨打的电话号码
              onPress(data.contactNumber);
            }}
          >
            <Text style={style.phone}>{data.contactNumber}</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  companyInfo: {
    fontSize: sizes.f3,
    color: colors[1101],
    marginTop: px2dp(53),
    marginBottom: px2dp(27),
  },
  concatContainer: {
    flexDirection: 'row',
    marginBottom: px2dp(36),
  },
  word: {
    color: colors[1101],
    fontSize: sizes.f2,
  },
  phone: {
    color: colors[1004],
    textDecorationLine: 'underline',
    fontSize: sizes.f2,
  },
});

ListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItem;
