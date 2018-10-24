import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, ViewPropTypes } from 'react-native';
import { px2dp } from '../../utils/px2dp';

export default function Icon({ imgUrl, containerStyle, imgStyle }) {
  return (
    <View style={containerStyle}>
      {imgUrl !== '' && <Image source={{ uri: imgUrl }} style={imgStyle} />}
    </View>
  );
}

Icon.propTypes = {
  imgUrl: PropTypes.string,
  /* eslint-disable react/no-typos */
  containerStyle: ViewPropTypes.style,
  imgStyle: Image.propTypes.style,
};

Icon.defaultProps = {
  imgUrl: '',
  containerStyle: {
    width: '100%',
    height: px2dp(140),
    borderRadius: px2dp(8),
    marginTop: px2dp(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: px2dp(140),
    height: px2dp(140),
  },
};
