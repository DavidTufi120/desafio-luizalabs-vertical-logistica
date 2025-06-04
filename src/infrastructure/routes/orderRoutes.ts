import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { InMemoryOrderRepository } from '../services/InMemoryOrderRepository';

const router = Router();
const orderRepository = new InMemoryOrderRepository();
const orderController = new OrderController(orderRepository);

router.post('/process', (req, res) => orderController.processOrders(req, res));
router.get('/', (req, res) => orderController.getOrders(req, res));

export default router; 