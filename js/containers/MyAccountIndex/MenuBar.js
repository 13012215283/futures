import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';

export default class MenuBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    uri: PropTypes.number.isRequired,
  };

  render() {
    const { onPress, title, uri } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          style={{
            width: px2dp(44),
            height: px2dp(44),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: px2dp(4),
            marginRight: px2dp(33),
          }}
          source={uri}
        />

        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ marginLeft: px2dp(450), justifyContent: 'center' }}>
          <Text
            style={[
              { fontFamily: 'iconfont', color: colors[1103] },
              styles.title,
            ]}
          >
            &#xe802;
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: px2dp(107),
    backgroundColor: colors.white,
    marginTop: px2dp(19),
    padding: px2dp(32),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: sizes.f3,
  },
  iconFont: {
    fontFamily: 'iconfont',
    fontSize: px2dp(30),
    color: '#fff',
  },
});
