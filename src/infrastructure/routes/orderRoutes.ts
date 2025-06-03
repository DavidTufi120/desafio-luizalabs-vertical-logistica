import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const orderController = new OrderController();

router.post('/process', (req, res) => orderController.processOrders(req, res));
router.get('/', (req, res) => orderController.getOrders(req, res));

export default router; 