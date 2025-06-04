import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';

export class ProcessOrdersUseCase {
    constructor(private readonly orderRepository: IOrderRepository) { }

    async execute(rawData: string): Promise<void> {
        // Split the raw data into lines and filter out empty lines
        const lines = rawData.split('\n').filter(line => line.trim());

        // Process each line to create an Order entity
        for (const line of lines) {
            const order = this.parseOrderLine(line);
            await this.orderRepository.save(order);
        }
    }

    private parseOrderLine(line: string): Order {
        // Remove clean spaces and tabs
        const cleanLine = line.trim();

        // Extract fields using correct positions
        const userId = parseInt(cleanLine.substring(0, 10).trim());
        const userName = cleanLine.substring(10, 55).trim();
        const orderId = parseInt(cleanLine.substring(55, 65).trim());
        const productId = parseInt(cleanLine.substring(65, 75).trim());
        const value = parseFloat(cleanLine.substring(75, 87).trim());
        const dateStr = cleanLine.substring(87, 95).trim();

        // Convert date from YYYYMMDD to Date
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1; // Month in JavaScript starts at 0
        const day = parseInt(dateStr.substring(6, 8));
        const date = new Date(year, month, day);

        return new Order(userId, userName, orderId, productId, value, date);
    }
}