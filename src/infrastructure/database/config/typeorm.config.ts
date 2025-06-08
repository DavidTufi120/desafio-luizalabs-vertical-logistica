import { DataSource } from 'typeorm';
import { OrderEntity } from '../entities/OrderEntity';
import path from 'path';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, 'database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [OrderEntity],
    migrations: [],
    subscribers: [],
}); 