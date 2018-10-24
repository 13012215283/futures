import React, { Component } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import PropTypes, { oneOf, oneOfType } from 'prop-types';
import styles from './styles';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const { content } = this.props;

    if (typeof content === 'function') {
      return <View style={styles.contentBox}>{content()}</View>;
    }

    return content ? <Text style={styles.content}>{content}</Text> : null;
  }

  renderButton() {
    const { button } = this.props;

    // 最多支持传入两个按钮
    return button.slice(0, 2).map((v, k, array) => {
      let textStyle = [styles.activeText];
      if (array.length === 2)
        textStyle = [styles.activeText, styles[`text${k}`]];

      return (
        <TouchableOpacity
          key={v.name || ''}
          style={styles.touchable}
          onPress={() => v.callback()}
        >
          <Text style={[textStyle, v.style]}>{v.name}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const { header, content, ...props } = this.props;
    return (
      <View>
        <Modal
          onRequestClose={this.props.onRequestClose}
          transparent
          {...props}
        >
          <View style={styles.mask}>
            <View style={styles.dialogContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.header}>{header}</Text>
                {this.renderContent()}
              </View>
              <View style={styles.activeContainer}>{this.renderButton()}</View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Dialog.propTypes = {
  header: PropTypes.string,
  content: oneOfType([PropTypes.string, PropTypes.func]),
  /* eslint-disable react/forbid-prop-types */
  button: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  animationType: oneOf(['none', 'slide', 'fade']),
  onRequestClose: PropTypes.func,
};

Dialog.defaultProps = {
  header: '提示',
  visible: false,
  animationType: 'fade',
  onRequestClose() {},
  content: '',
};
export default Dialog;
