import { InMemoryOrderRepository } from "./InMemoryOrderRepository";
import { Order } from "../../domain/entities/Order";

describe('InMemoryOrderRepository', () => {
    let repository: InMemoryOrderRepository;
    let order: Order;

    beforeEach(() => {
        repository = new InMemoryOrderRepository();
        order = new Order(1, "Davi Toledo", 123, 321, 123.45, new Date('2021-01-01'));
    });

    it('should save and retrieve all orders', async () => {
        await repository.save(order);
        const allOrders = await repository.findAll();
        expect(allOrders).toHaveLength(1);
        expect(allOrders[0].getOrderId()).toBe(123);
    });

    it('should find orders by orderId', async () => {
        await repository.save(order);
        const foundOrders = await repository.findByOrderId(123);
        expect(foundOrders).toHaveLength(1);
        expect(foundOrders[0].getProductId()).toBe(321);
    });

    it('should return empty array if no orders found', async () => {
        const userOrders = await repository.findByUserId(999);
        expect(userOrders).toEqual([]);
    });
});
