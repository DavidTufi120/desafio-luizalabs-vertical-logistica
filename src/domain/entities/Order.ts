export class Order {
  constructor(
    private readonly userId: number,
    private readonly userName: string,
    private readonly orderId: number,
    private readonly productId: number,
    private readonly value: number,
    private readonly date: Date,
  ) { }

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

  toJSON(): {
    userId: number;
    userName: string;
    orderId: number;
    productId: number;
    value: string;
    date: string;
    } {
    return {
      userId: this.userId,
      userName: this.userName,
      orderId: this.orderId,
      productId: this.productId,
      value: this.value.toFixed(2),
      date: this.date.toISOString(),
    };
  }
} 
