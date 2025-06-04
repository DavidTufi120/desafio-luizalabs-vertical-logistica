import { Request, Response } from 'express';
import { ProcessOrdersUseCase } from '../../application/use-cases/ProcessOrdersUseCase';
import { InMemoryOrderRepository } from '../services/InMemoryOrderRepository';

export class OrderController {
    private processOrdersUseCase: ProcessOrdersUseCase;
    private orderRepository: InMemoryOrderRepository;

    constructor(orderRepository: InMemoryOrderRepository) {
        this.orderRepository = orderRepository;
        this.processOrdersUseCase = new ProcessOrdersUseCase(orderRepository);
    }

    async processOrders(req: Request, res: Response): Promise<void> {
        try {
            const rawData = req.body.data;

            if (!rawData) {
                res.status(400).json({ error: 'No data provided' });
                return;
            }

            await this.processOrdersUseCase.execute(rawData);
            res.status(200).json({ message: 'Orders processed successfully' });
        } catch (error) {
            console.error('Error processing orders:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getOrders(_req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.orderRepository.findAll();
            console.log(this.orderRepository);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
} 