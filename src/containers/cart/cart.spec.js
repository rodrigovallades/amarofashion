import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Cart } from './index'

describe('Cart container', function () {

  it('renders "Cart" deep correctly', () => {
    const tree = renderer.create(<Cart/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders "Cart" shallow correctly', () => {
    const component = shallow(<Cart/>);
    expect(component.exists()).toEqual(true);
  });
})
