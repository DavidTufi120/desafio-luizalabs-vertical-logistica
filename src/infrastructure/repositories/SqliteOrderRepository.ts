import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import { AppDataSource } from '../database/config/typeorm.config';
import { OrderEntity } from '../database/entities/OrderEntity';
import { Between } from 'typeorm';

export class SqliteOrderRepository implements IOrderRepository {
    private repository = AppDataSource.getRepository(OrderEntity);

    async save(order: Order): Promise<void> {
        const orderEntity = new OrderEntity();
        orderEntity.userId = order.getUserId().toString();
        orderEntity.name = order.getUserName();
        orderEntity.orderId = order.getOrderId().toString();
        orderEntity.productId = order.getProductId().toString();
        orderEntity.value = order.getValue();
        orderEntity.date = order.getDate().toISOString().split('T')[0];

        await this.repository.save(orderEntity);
    }

    async findByOrderId(orderId: number): Promise<Order[]> {
        const orders = await this.repository.find({
            where: { orderId: orderId.toString() },
            order: { date: 'ASC' }
        });

        return orders.map(order => new Order(
            parseInt(order.userId),
            order.name,
            parseInt(order.orderId),
            parseInt(order.productId),
            order.value,
            new Date(order.date)
        ));
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
        const orders = await this.repository.find({
            where: {
                date: Between(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
            },
            order: { date: 'ASC' }
        });

        return orders.map(order => new Order(
            parseInt(order.userId),
            order.name,
            parseInt(order.orderId),
            parseInt(order.productId),
            order.value,
            new Date(order.date)
        ));
    }

    async findAll(): Promise<Order[]> {
        const orders = await this.repository.find({
            order: { date: 'ASC' }
        });

        return orders.map(order => new Order(
            parseInt(order.userId),
            order.name,
            parseInt(order.orderId),
            parseInt(order.productId),
            order.value,
            new Date(order.date)
        ));
    }

    async saveMany(orders: Order[]): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const order of orders) {
                await queryRunner.query(
                    `INSERT OR IGNORE INTO orders (userId, name, orderId, productId, value, date)
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        order.getUserId().toString(),
                        order.getUserName(),
                        order.getOrderId().toString(),
                        order.getProductId().toString(),
                        order.getValue(),
                        order.getDate().toISOString().split('T')[0]
                    ]
                );
            }
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
} 