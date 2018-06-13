import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Products } from './index'

describe('Products container', function () {

  it('renders "Products" deep correctly', () => {
    const tree = renderer.create(<Products/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders "Products" shallow correctly', () => {
    const component = shallow(<Products/>);
    expect(component.exists()).toEqual(true);
  });
})
