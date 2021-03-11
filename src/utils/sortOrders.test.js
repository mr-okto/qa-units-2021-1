import React from 'react'
import {sortOrders, getSortFunction, sortTypes, sortByItemCount, sortByDate} from './sortOrders';

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toBe(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('items are null', () => {
		const order1 = {
			items: null,
		};
		const order2 = {
			items: null,
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});

	it('items are not objects', () => {
		const result = sortByItemCount(undefined, undefined);
		expect(result).toBe(0);
	});

	test.each([
		[{items: ['item1', 'item2']}, {items: ['1', '2', '3']}, -1],
		[{items: ['item1', 'item2', 'item3']}, {items: ['1', '2']}, 1],
	])('sortByItemCount different items count test', (order1, order2, expected) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		[{date: 1552585550000}, {date: 1552585550000}, 0],
		[{date: 1552585550001}, {date: 1552585550000}, -1],
		[{date: 1552585550000}, {date: 1552585550001}, 1],
	])('sortByDate valid dates test', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	})
	test.each([
		[{date: 1552585550000}, {date: null}],
		[{date: null}, {date: 1552585550000}],
		[{date: null}, {date: null}],
		[{date: 1552585550000}, null],
		[null, {date: 1552585550000}],
		[null, null],
		[undefined, undefined],
	])('sortByDate valid invalid objects test', (order1, order2) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	})
});

describe('sortOrders function', () => {
	it('sortOrders sort is called', function () {
		const orders = [1, 2, 3];
		const sortFunction = jest.fn();
		sortOrders(orders, sortFunction);
		expect(sortFunction).toBeCalled();
	});

	it('sortOrders orders are null', function () {
		const sortFunction = jest.fn();
		sortOrders(null, sortFunction);
		expect(sortFunction).not.toBeCalled();
	});

	it('sortOrders sortFunction is null', function () {
		const orders = [2, 3, 1];
		sortOrders(orders, null);
		expect(orders).toEqual([2, 3, 1]);
	});

	it('sortOrders sort results are applied', function () {
		const sortFunction = jest.fn((l_value, r_value) => l_value - r_value);
		const orders = [2, 3, 1, 5, 4];
		sortOrders(orders, sortFunction);
		expect(orders).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('getSortFunction function', () => {
	test.each([
		[sortTypes.COUNT, sortByItemCount],
		[sortTypes.DATE, sortByDate],
	])('getSortFunction test switch', (sortType, expected) => {
		expect(getSortFunction(sortType)).toBe(expected);
	});
});


