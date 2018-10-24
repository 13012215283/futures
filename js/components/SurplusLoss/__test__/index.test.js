import React from 'react';
import { shallow } from 'enzyme';
import TestRender from 'react-test-renderer';
import Dialog from '../../Dialog';
import SurplusLoss from '../index';

describe('弹窗组件', () => {
  it('能够正确渲染', () => {
    const tree = TestRender.create(
      <SurplusLoss
        header="设置止盈止送"
        button={[
          {
            name: '取消',
            callback() {},
          },
          {
            name: '确认',
            callback() {},
          },
        ]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('组件包括一个Dialog', () => {
    const tree = shallow(
      <SurplusLoss
        header="设置止盈止送"
        button={[
          {
            name: '取消',
            callback() {},
          },
          {
            name: '确认',
            callback() {},
          },
        ]}
      />
    );

    expect(tree.find(Dialog).length).toBe(1);
  });
});
