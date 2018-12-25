import React from 'react';
import { shallow } from 'enzyme';
import immutable from 'immutability-helper';

import { Products } from './index';
import mockData from '../../../public/products.json';

const mockProducts = JSON.parse(JSON.stringify(mockData.products));

const mockGetProducts = jest.fn();

const props = {
  getProducts: mockGetProducts,
	products: {
    data: [],
    loading: false,
  },
};

function setup(ownProps = props) {
  return shallow(<Products {...ownProps} />)
};

describe('Products', function () {
  let wrapper;

  describe('basic functionality', () => {
    beforeAll(() => {
      wrapper = setup();
    });

    it('should render loader when fetching data', () => {
      wrapper.setProps(immutable(wrapper.instance().props, {
        products: {
          loading: { $set: true },
        },
      }));

      expect(wrapper.find('Loader').exists()).toBe(true);
    });
  });

  describe('with no data', () => {
    beforeAll(() => {
      wrapper = setup();
    });

    it('should render properly with no products', () => {
      expect(wrapper.find('.products__toolbar').exists()).toBe(true);
      expect(wrapper.find('.products__filter').exists()).toBe(true);
      expect(wrapper.find('.products').exists()).toBe(true);
      expect(wrapper.find('.products > p').text()).toBe('No products available right now :(');
    });
  });

  describe('with data', () => {
    beforeAll(() => {
			wrapper.setProps(immutable(wrapper.instance().props, {
				products: {
					data: { $set: mockProducts },
				},
			}));
    });

    it('should render properly with products list', () => {
      expect(wrapper.find('.products__toolbar').exists()).toBe(true);
      expect(wrapper.find('.products__filter').exists()).toBe(true);
      expect(wrapper.find('.products').exists()).toBe(true);
      expect(wrapper.find('.products').children()).toHaveLength(wrapper.instance().props.products.data.length);
    });
  });
});
