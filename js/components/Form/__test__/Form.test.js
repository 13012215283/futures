import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Form from '../Form';

describe('<Form/>', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Form>
          <Text>hello</Text>
        </Form>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiple children correctly', () => {
    const tree = shallow(
      <Form>
        <Text>HELLO</Text>
        <Text>WORLD</Text>
        <Text>!!!!!</Text>
      </Form>
    );
    expect(tree.find(Text).length).toBe(3);
  });
});
