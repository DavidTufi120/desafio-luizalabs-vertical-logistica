export class Order {
    private readonly userId: number;
    private readonly userName: string;
    private readonly orderId: number;
    private readonly productId: number;
    private readonly value: number;
    private readonly date: Date;

    constructor(
        userId: number,
        userName: string,
        orderId: number,
        productId: number,
        value: number,
        date: Date
    ) {
        this.userId = userId;
        this.userName = userName;
        this.orderId = orderId;
        this.productId = productId;
        this.value = value;
        this.date = date;
    }

    getUserId(): number {
        return this.userId;
    }

    getUserName(): string {
        return this.userName;
    }

    getOrderId(): number {
        return this.orderId;
    }

    getProductId(): number {
        return this.productId;
    }

    getValue(): number {
        return this.value;
    }

    getDate(): Date {
        return this.date;
    }

    toJSON() {
        return {
            user_id: this.userId,
            name: this.userName,
            order_id: this.orderId,
            product_id: this.productId,
            value: this.value.toFixed(2),
            date: this.date.toISOString().split('T')[0]
        };
    }
} 