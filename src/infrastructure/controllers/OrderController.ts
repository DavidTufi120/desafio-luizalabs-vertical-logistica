import { Request, Response } from 'express';
import { ProcessOrdersUseCase } from '../../application/use-cases/ProcessOrdersUseCase';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import fs from 'fs/promises';

export class OrderController {
    private processOrdersUseCase: ProcessOrdersUseCase;
    private orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
        this.processOrdersUseCase = new ProcessOrdersUseCase(orderRepository);
    }

    async processFile(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        if (Array.isArray(req.file)) {
            res.status(400).json({ error: 'Only one file can be uploaded at a time.' });
            return;
        }
        try {
            const fileContent = await fs.readFile(req.file.path, 'utf-8');
            if (!fileContent.trim()) {
                await fs.unlink(req.file.path);
                res.status(400).json({ error: 'Uploaded file is empty' });
                return;
            }
            await this.processOrdersUseCase.execute(fileContent);
            await fs.unlink(req.file.path);
            res.status(200).json({ message: 'TXT file processed successfully' });
        } catch (error: any) {
            console.error('Error processing file:', error);
            if (req.file) {
                await fs.unlink(req.file.path);
            }
            res.status(400).json({ error: error.message || 'Error processing file' });
        }
    }

    async getOrders(req: Request, res: Response): Promise<void> {
        try {
            const { order_id, start_date, end_date } = req.query;

            if (order_id && isNaN(Number(order_id))) {
                res.status(400).json({ error: 'order_id must be a number' });
                return;
            }
            if (start_date && isNaN(Date.parse(start_date as string))) {
                res.status(400).json({ error: 'start_date must be a valid date (YYYY-MM-DD)' });
                return;
            }
            if (end_date && isNaN(Date.parse(end_date as string))) {
                res.status(400).json({ error: 'end_date must be a valid date (YYYY-MM-DD)' });
                return;
            }

            const orders = await this.orderRepository.findAll();

            const usersMap = new Map<number, any>();

            for (const order of orders) {
                const userId = order.getUserId();
                const userName = order.getUserName();
                const orderId = order.getOrderId();
                const productId = order.getProductId();
                const value = Number(order.getValue());
                const date = order.getDate();
                const formattedDate = date.toISOString().split('T')[0];

                if (order_id && Number(order_id) !== orderId) continue;

                if (start_date && date < new Date(start_date as string)) continue;
                if (end_date && date > new Date(end_date as string)) continue;

                if (!usersMap.has(userId)) {
                    usersMap.set(userId, {
                        user_id: userId,
                        name: userName,
                        orders: []
                    });
                }

                const user = usersMap.get(userId);

                let userOrder = user.orders.find((o: any) => o.order_id === orderId);

                if (!userOrder) {
                    userOrder = {
                        order_id: orderId,
                        total: 0,
                        date: formattedDate,
                        products: []
                    };
                    user.orders.push(userOrder);
                }

                userOrder.products.push({
                    product_id: productId,
                    value: value.toFixed(2)
                });

                userOrder.total = (Number(userOrder.total) + value).toFixed(2);
            }

            const result = Array.from(usersMap.values());

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
}