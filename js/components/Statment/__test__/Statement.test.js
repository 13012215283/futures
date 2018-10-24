import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Statement from '../Statement';

describe('<Statement/>', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Statement>
          <Text>hello</Text>
        </Statement>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiple children correctly', () => {
    const tree = shallow(
      <Statement>
        <Text>hello</Text>
        <Text>world</Text>
      </Statement>
    );
    expect(tree.find(Text).length).toBe(4);
  });

  it('simulates events correctly', () => {
    let click = false;
    const tree = shallow(
      <Statement
        onPress={() => {
          click = true;
        }}
      >
        <Text>hello</Text>
        <Text>world</Text>
      </Statement>
    );
    tree.childAt(0).simulate('press');
    expect(click).toBe(true);
  });
});
