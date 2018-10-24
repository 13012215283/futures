import { View, Text } from 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import BumpedContainer from '../index';

/**
 * @property initPos 初始展现时距离顶部的距离
 * @property bumptPos 弹框弹出时距离顶部的距离
 */

test('BumpedContainer renders correctly', () => {
  const tree = renderer
    .create(
      <BumpedContainer initPos={45} bumptPos={10}>
        <View>
          <Text>test</Text>
        </View>
      </BumpedContainer>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('if set property novalue, it render correctly', () => {
  const tree = renderer
    .create(
      <BumpedContainer>
        <View>
          <Text>test</Text>
        </View>
      </BumpedContainer>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
