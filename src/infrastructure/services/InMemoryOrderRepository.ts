import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';

export class InMemoryOrderRepository implements IOrderRepository {
    private orders: Order[] = [];

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async findByUserId(userId: number): Promise<Order[]> {
        return this.orders.filter(order => order.getUserId() === userId);
    }

    async findByOrderId(orderId: number): Promise<Order[]> {
        return this.orders.filter(order => order.getOrderId() === orderId);
    }

    async findAll(): Promise<Order[]> {
        return [...this.orders];
    }
} 