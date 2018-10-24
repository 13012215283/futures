import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import FooterItem from '../FooterItem';

describe('</FooterItem/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FooterItem text="忘记密码" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly as separator', () => {
    const tree = renderer
      .create(<FooterItem text="|" type="separating" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('simulates events correctly ', () => {
    let click = false;
    const tree = shallow(
      <FooterItem
        text="click！"
        onPress={() => {
          click = true;
        }}
      />
    );

    tree.find('Text').simulate('press');
    expect(click).toBe(true);
  });
});

it('renders correctly as separator', () => {
  const tree = renderer
    .create(<FooterItem text="|" type="separating" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
