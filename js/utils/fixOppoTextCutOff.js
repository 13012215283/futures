// #15114 Oppo A77 - Some texts gets cut-off
// see: https://github.com/facebook/react-native/issues/15114#issuecomment-341988546

import React from 'react';

import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'lucida grande',
  },
});

export default function fixOppoTextCutOff() {
  const oldRender = Text.prototype.render;
  Text.prototype.render = function render(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style],
    });
  };
}
