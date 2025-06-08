import { Order } from './Order';

describe('Order', () => {
  it('should create an order', () => {
    const order = new Order(1, 'Davi Toledo', 123, 321, 123.45, new Date('2021-01-01'));

    expect(order.getUserId()).toBe(1);
    expect(order.getOrderId()).toBe(123);
    expect(order.getUserName()).toBe('Davi Toledo');
    expect(order.getProductId()).toBe(321);
    expect(order.getValue()).toBe(123.45);
    expect(order.getDate().toISOString().split('T')[0]).toBe('2021-01-01');
    expect(order.toJSON()).toEqual({
      userId: 1,
      userName: 'Davi Toledo',
      orderId: 123,
      productId: 321,
      value: '123.45',
      date: new Date('2021-01-01').toISOString(),
    });
  });
});
