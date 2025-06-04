import express from 'express';
import { OrderController } from './infrastructure/controllers/OrderController';
import { InMemoryOrderRepository } from './infrastructure/services/InMemoryOrderRepository';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const orderRepository = new InMemoryOrderRepository();
const orderController = new OrderController(orderRepository);

app.post('/orders/process', (req, res) => orderController.processOrders(req, res));

app.get('/orders', (req, res) => orderController.getOrders(req, res));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 