import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('orders')
@Unique(['orderId', 'productId'])
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    orderId: string;

    @Column()
    productId: string;

    @Column()
    value: number;

    @Column()
    date: string;
} 