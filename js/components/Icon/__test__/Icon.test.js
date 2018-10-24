import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../Icon';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Icon imgUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=49366202,632101467&fm=27&gp=0.jpg" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without set any child', () => {
  const tree = renderer.create(<Icon />).toJSON();

  expect(tree).toMatchSnapshot();
});
