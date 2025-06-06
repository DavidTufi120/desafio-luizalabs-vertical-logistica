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
    async getOrders(req: Request, res: Response): Promise<void> {
        try {
            const { order_id, start_date, end_date } = req.query;

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