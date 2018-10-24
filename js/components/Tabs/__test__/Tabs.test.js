import { View, Text } from 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import Tabs from '../index';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Tabs tabNames={['item0', 'item1', 'item2']}>
        <View style={{ flex: 1 }}>
          <Text>Welcome to React Native!</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>To get started, edit App.js</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>xxxxxxx</Text>
        </View>
      </Tabs>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
