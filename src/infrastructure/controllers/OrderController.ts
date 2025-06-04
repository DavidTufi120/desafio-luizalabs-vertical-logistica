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

    async processOrdersFromText(rawData: string): Promise<void> {
        await this.processOrdersUseCase.execute(rawData);
    }

    async getOrders(_req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.orderRepository.findAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
}