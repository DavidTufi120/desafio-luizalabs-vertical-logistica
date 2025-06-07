import { Order } from '../entities/Order';

export interface IOrderRepository {
    save(order: Order): Promise<void>;
    findByOrderId(orderId: number): Promise<Order[]>;
    findAll(): Promise<Order[]>;
} 