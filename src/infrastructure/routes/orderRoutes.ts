import { Router } from 'express';
import multer from 'multer';
import { OrderController } from '../controllers/OrderController';
import { SqliteOrderRepository } from '../repositories/SqliteOrderRepository';

const router = Router();
const upload = multer({ dest: 'uploads/' });
const orderRepository = new SqliteOrderRepository();
const orderController = new OrderController(orderRepository);

router.post('/upload', upload.single('file'), (req, res) => orderController.processFile(req, res));
router.get('/orders', (req, res) => orderController.getOrders(req, res));

export { router as orderRoutes }; 
