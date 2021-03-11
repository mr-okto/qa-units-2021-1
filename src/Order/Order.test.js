/* eslint-disable import/first */
jest.mock('../utils/getDate');

import React from 'react'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {getDate} from '../utils/getDate';
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";

configure({adapter: new Adapter()});

describe('Order.js', () => {
  beforeEach(() => {
    jest.resetModules();
    getDate.mockReturnValue("11 марта, чт, 2021 год");
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('render no order is null', () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('render empty order is null', () => {
    const wrapper = shallow(<Order order={{}}/>);
    expect(wrapper.getElement()).toBeNull();
  });

  it('render order without shop is null', () => {
    let order = Object.assign({}, fakeOrders[0]);
    delete order.shop;
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper.getElement()).toBeNull();
  });

  it('render order without date is null', () => {
    let order = Object.assign({}, fakeOrders[0]);
    delete order.date;
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper.getElement()).toBeNull();
  });

  it('render order without items snapshot', () => {
    let order = Object.assign({}, fakeOrders[0]);
    delete order.items;
    const wrapper = shallow(<Order order={order}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render fake order snapshot', () => {
    const order = fakeOrders[0];
    const wrapper = shallow(<Order order={order}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('getDate is called', () => {
    const order = fakeOrders[0]
    const wrapper = shallow(<Order order={order}/>);
    expect(getDate).toHaveBeenCalled();
  });
});

