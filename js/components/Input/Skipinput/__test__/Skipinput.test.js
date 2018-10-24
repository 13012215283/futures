import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { shallow } from 'enzyme';
import Skipinput from '../index';

test('click event', () => {
  const fnSkipTo = jest.fn();

  const wrapper = shallow(
    <Skipinput title="请选择银行卡号" skipTo={fnSkipTo} />
  );

  wrapper
    .find(TouchableWithoutFeedback)
    .at(0)
    .simulate('press');

  expect(fnSkipTo).toHaveBeenCalled();
});
