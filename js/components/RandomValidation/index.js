import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import { px2dp } from '../../utils/px2dp';

export default class RandomValidationComponent extends React.Component {
  static propTypes = {
    randomString: PropTypes.string,
  };
  static defaultProps = {
    /* eslint-disable prettier/prettier */
    randomString: `${Math.random().toString(36).slice(2, 6)}`,
  };
  constructor(props) {
    super(props);
    this.randomDegitArray = Array(4).fill(1).map(()=>Math.random()*60)
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.randomString.split('').map((randomText,index) => (
          /* eslint-disable react/no-array-index-key */
          <View style={styles.wrapper} key={index}>
            <Text
              style={[
                {
                  transform: [
                    {
                      rotateZ: `${this.randomDegitArray[index]}deg`,
                    },
                  ],
                  color: 'white',
                  fontSize: px2dp(35),
                },
              ]}
            >
              {randomText}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: px2dp(116),
    height: px2dp(60),
    flexDirection: 'row',
    marginRight: px2dp(4),
    marginTop: px2dp(5),
  },
  wrapper: {
    backgroundColor: 'black',
    width: px2dp(29),
    height: px2dp(50),
    alignItems:'center',
    justifyContent:'center'
  },
});
