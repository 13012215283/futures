import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

export default class BumpedContainer extends Component {
  static defaultProps = {
    initPos: 0,
    bumptPos: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      keyboardShow: false,
    };

    this.keyboardShowListener = null;
    this.keyboardHideListener = null;

    this.keyboardDidShowHandler = this.keyboardDidShowHandler.bind(this);
    this.keyboardDidHideHandler = this.keyboardDidHideHandler.bind(this);
  }

  componentWillMount() {
    this.keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler
    );

    this.keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler
    );
  }

  keyboardDidShowHandler() {
    this.setState({
      keyboardShow: true,
    });
  }

  keyboardDidHideHandler() {
    this.setState({
      keyboardShow: false,
    });
  }

  render() {
    const { initPos, bumptPos } = this.props;

    return (
      <View
        style={[
          styles.inputArea,
          { top: initPos },
          this.state.keyboardShow && {
            top: bumptPos,
          },
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

BumpedContainer.propTypes = {
  children: PropTypes.element.isRequired,
  initPos: PropTypes.number,
  bumptPos: PropTypes.number,
};
