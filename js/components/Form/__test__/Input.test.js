import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('<Input />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Input label="账号" placeholder="请输入姓名" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulates onChangeText events', () => {
    let val = '';
    const wrapper = shallow(
      <Input
        label="密码"
        placeholder="请输入密码"
        onChangeText={text => {
          val = text;
        }}
        secureTextEntry
      />
    );
    wrapper.find('TextInput').simulate('ChangeText', '888');
    expect(val).toBe('888');
  });
});
