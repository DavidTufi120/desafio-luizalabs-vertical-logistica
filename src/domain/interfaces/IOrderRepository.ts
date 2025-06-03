import { Order } from '../entities/Order';

export interface IOrderRepository {
    save(order: Order): Promise<void>;
    findByUserId(userId: number): Promise<Order[]>;
    findByOrderId(orderId: number): Promise<Order[]>;
    findAll(): Promise<Order[]>;
} 