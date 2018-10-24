import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  InteractionManager,
  Keyboard,
} from 'react-native';
// import dismissKeyboard from 'dismissKeyboard';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors } from 'futures/components/themes';

// @flow
type Props = {
  style: View.propTypes.style,
  inputItemStyle: View.propTypes.style,
  iconStyle: View.propTypes.style,
  maxLength: TextInput.propTypes.maxLength.isRequired,
  onChange: PropTypes.func,
  onEnd: PropTypes.func,
  autoFocus: PropTypes.bool,
};

class PasswordInput extends PureComponent<Props> {
  static defaultProps = {
    autoFocus: false,
    onChange: () => {},
    onEnd: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      InteractionManager.runAfterInteractions(() => {
        this.onPress();
      });
    }
  }

  getInputItem() {
    const inputItem = [];
    const { text } = this.state;
    for (let i = 0; i < parseInt(this.props.maxLength, 10); i += 1) {
      if (i === 0) {
        inputItem.push(
          <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
            {i < text.length ? (
              <View style={[styles.iconStyle, this.props.iconStyle]} />
            ) : null}
          </View>
        );
      } else {
        inputItem.push(
          <View
            key={i}
            style={[
              styles.inputItem,
              styles.inputItemBorderLeftWidth,
              this.props.inputItemStyle,
            ]}
          >
            {i < text.length ? (
              <View style={[styles.iconStyle, this.props.iconStyle]} />
            ) : null}
          </View>
        );
      }
    }
    return inputItem;
  }

  render() {
    const { onChange, onEnd, style, maxLength } = this.props;
    return (
      <TouchableHighlight
        onPress={this.onPress}
        activeOpacity={1}
        underlayColor="transparent"
      >
        <View style={[styles.container, style]}>
          <TextInput
            style={styles.textInput}
            maxLength={maxLength}
            autoFocus={false}
            keyboardType="numeric"
            value={this.state.text}
            onChangeText={text => {
              this.setState({ text });
              onChange(text);
              if (text.length === maxLength) {
                Keyboard.dismiss();
                onEnd(text);
              }
            }}
            onFocus={() => {
              const { text } = this.state;
              if (text.length === maxLength) {
                this.setState({ text: '' });
              }
            }}
          />
          {this.getInputItem()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors[1104],
    width: px2dp(78) * 6,
  },
  inputItem: {
    height: px2dp(78),
    width: px2dp(78),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputItemBorderLeftWidth: {
    borderLeftWidth: px2dp(2),
    borderColor: colors[1104],
  },
  iconStyle: {
    width: px2dp(26),
    height: px2dp(26),
    backgroundColor: colors[1101],
    borderRadius: px2dp(13),
  },
  textInput: {
    height: px2dp(78),
    zIndex: 99,
    position: 'absolute',
    width: px2dp(78) * 6,
    opacity: 0,
  },
});
export default PasswordInput;
