import { Order } from '../entities/Order';

export interface IOrderRepository {
    saveMany(orders: Order[]): Promise<void>;
    findByOrderId(orderId: number): Promise<Order[]>;
    findAll(): Promise<Order[]>;
} 
