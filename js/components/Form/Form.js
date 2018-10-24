import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from '../../utils/px2dp';

export default function Form({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {React.Children.map(children, child => child)}
      </View>
    </View>
  );
}
Form.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: px2dp(64),
    marginBottom: 0,
  },
});
