import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { px2dp } from '../../utils/px2dp';

export default function Footer({ children }) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: px2dp(64),
        width: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.Children.map(children, child => child)}
      </View>
    </View>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};
