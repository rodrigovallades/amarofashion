import React from 'react';
import { shallow } from 'enzyme';

import { Cart } from './index';

const mockToggle = jest.fn();

const props = {
	toggle: mockToggle,
	cart: {
		isActive: false,
		data: [],
	},
	fullscreen: false,
}

function setup(ownProps = props) {
  return shallow(<Cart {...ownProps} />);
}

describe('Cart', function () {
	let wrapper;

	describe('with cart closed', () => {
		beforeAll(() => {
			wrapper = setup();
		});

		it('should render toggle icon', () => {
			expect(wrapper.find('.cart__toggler').exists()).toBe(true);
		});
	});

	describe('with cart open', () => {
		beforeAll(() => {
			wrapper = setup({
        ...props,
        cart: {
					...props.cart,
					isActive: true,
				}
      });
		});

		it('should render products and sum', () => {
			expect(wrapper.find('.cart__container').exists()).toBe(true);
			expect(wrapper.find('.cart__total').exists()).toBe(true);
			expect(wrapper.find('.cart__container').exists()).toBe(true);
		});
	});
})
