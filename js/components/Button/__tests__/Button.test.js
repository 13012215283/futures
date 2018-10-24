import React from 'react';
import TestRender from 'react-test-renderer';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Button from '../../Button/';

test('should render correctly', () => {
  const button = TestRender.create(
    <View>
      <Button type="primary" text="确认平仓" subStatus="enable" />
      <Button
        type="status"
        text="交割中"
        subStatus="pending"
        containerStyle={{ height: 80 }}
        textStyle={{ color: '#ccc' }}
      />
    </View>
  ).toJSON();

  expect(button).toMatchSnapshot();
});

describe('<Button />', () => {
  it('simulates click events', () => {
    let click = false;
    const wrapper = shallow(
      <Button
        type="operation"
        text="平仓"
        subStatus="fillMoney"
        onPress={() => {
          click = true;
        }}
      />
    );
    wrapper.find('TouchableOpacity').simulate('press');
    expect(click).toBe(true);
  });
});
