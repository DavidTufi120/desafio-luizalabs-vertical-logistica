import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';

export class ProcessOrdersUseCase {
    constructor(private readonly orderRepository: IOrderRepository) { }

    async execute(rawData: string): Promise<void> {
        const lines = rawData.split('\n').filter(line => line.trim());

        for (const line of lines) {
            const order = this.parseOrderLine(line);
            await this.orderRepository.save(order);
        }
    }

    private parseOrderLine(line: string): Order {
        // Parse the fixed-width format
        const userId = parseInt(line.substring(0, 10));
        const userName = line.substring(10, 55).trim();
        const orderId = parseInt(line.substring(55, 65));
        const productId = parseInt(line.substring(65, 75));
        const value = parseFloat(line.substring(75, 87));
        const dateStr = line.substring(87, 95);

        // Convert date from YYYYMMDD to Date object
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = parseInt(dateStr.substring(6, 8));
        const date = new Date(year, month, day);

        return new Order(userId, userName, orderId, productId, value, date);
    }
}