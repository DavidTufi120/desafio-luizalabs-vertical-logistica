import { Request, Response } from 'express';
import { InMemoryOrderRepository } from '../services/InMemoryOrderRepository';

export class OrderController {

    constructor() { }

    async processOrders(_req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ message: 'Orders processed successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to process orders' });
        }
    }

    async getOrders(_req: Request, res: Response): Promise<void> {
        try {
            const orderRepository = new InMemoryOrderRepository();
            const orders = await orderRepository.findAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
} 