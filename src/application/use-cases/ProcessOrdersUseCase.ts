import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';

export class ProcessOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute(rawData: string): Promise<void> {
    const lines = rawData.split('\n').filter(line => line.trim());
    const orders: Order[] = [];
    for (const line of lines) {
      orders.push(this.parseOrderLine(line));
    }
    // Save all at once (batch insert)
    await this.orderRepository.saveMany(orders);
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
