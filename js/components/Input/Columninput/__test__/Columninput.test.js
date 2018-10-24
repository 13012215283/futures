import React from 'react';

import renderer from 'react-test-renderer';
import Columninput from '../index';

/** 身份验证中的输入框
 * @property placeholder 输入框的提示语 default:'请输入'
 */

it('renders correctly', () => {
  const tree = renderer
    .create(<Columninput placeholder="请输入姓名" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
