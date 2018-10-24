import React from 'react';
import { shallow } from 'enzyme';
import TestRender from 'react-test-renderer';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import Dialog from '../index';

describe('弹窗组件', () => {
  it('能够正确渲染', () => {
    const tree = TestRender.create(
      <Dialog
        content="内容"
        header="标题"
        button={[{ name: '按钮', callback() {} }]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('组件包括5层View,一个Moal', () => {
    const tree = shallow(
      <Dialog
        content="内容"
        header="标题"
        button={[{ name: '按钮', callback() {} }]}
      />
    );

    expect(tree.find(View).length).toBe(5);
    expect(tree.find(Modal).length).toBe(1);
  });

  it('最多接受传入两个按钮', () => {
    const tree = shallow(
      <Dialog
        content="内容"
        header="标题"
        button={[
          {
            name: '确认',
            callback() {
              Alert.alert('确认');
            },
          },
          { name: '取消', callback() {} },
          { name: '按钮三', callback() {} },
        ]}
      />
    );

    expect(tree.find(TouchableOpacity).length).toBe(2);
  });
});
