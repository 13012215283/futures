import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Stepper from '../index';
import InputField from '../../InputField/index';

const stepper = shallow(
  <Stepper max={0.03} min={0.01} step={0.01} value="0.02" />
);

test('render correctly', () => {
  const tree = TestRenderer.create(<Stepper />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('render correctly', () => {
  const tree = TestRenderer.create(
    <Stepper max={10} min={5} step={1} value="1" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('按钮数量', () => {
  const buttons = stepper.find(TouchableWithoutFeedback);
  expect(buttons.length).toBe(2);
});

test('数值增减及临界值', () => {
  const downStep = stepper.find(TouchableWithoutFeedback).at(0);
  const upStep = stepper.find(TouchableWithoutFeedback).at(1);

  downStep.simulate('pressIn');
  expect(stepper.state('value')).toBe('0.01');
  downStep.simulate('pressIn');
  expect(stepper.state('value')).toBe('0.01');
  upStep.simulate('pressIn');
  expect(stepper.state('value')).toBe('0.02');
  upStep.simulate('pressIn');
  expect(stepper.state('value')).toBe('0.03');
  upStep.simulate('pressIn');
  expect(stepper.state('value')).toBe('0.03');
});

test('输入框', () => {
  const input = stepper.find(InputField).at(0);
  input.simulate('change', '0.03');
  expect(stepper.state('value')).toBe('0.03');
  input.simulate('change', '0.04');
  expect(stepper.state('isWarning')).toBe(false);
  input.simulate('change', '0.00');
  expect(stepper.state('isWarning')).toBe(true);
});
