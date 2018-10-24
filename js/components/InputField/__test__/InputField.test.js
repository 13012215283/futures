import React from 'react';
import TestRenderer from 'react-test-renderer';
import InputField from '../index';

test('render correctly', () => {
  const tree = TestRenderer.create(<InputField />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('render correctly', () => {
  const tree = TestRenderer.create(<InputField type="integer" />).toJSON();
  expect(tree).toMatchSnapshot();
});
