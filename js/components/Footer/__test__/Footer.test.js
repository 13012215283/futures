import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

describe('<Footer/>', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Footer>
          <Text>hello</Text>
        </Footer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiple children correctly', () => {
    const tree = shallow(
      <Footer>
        <Text>hello</Text>
        <Text>world</Text>
      </Footer>
    );
    expect(tree.find(Text).length).toBe(2);
  });
});
