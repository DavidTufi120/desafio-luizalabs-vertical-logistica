import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

import { OrderController } from './infrastructure/controllers/OrderController';
import { InMemoryOrderRepository } from './infrastructure/services/InMemoryOrderRepository';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const orderRepository = new InMemoryOrderRepository();
const orderController = new OrderController(orderRepository);

app.post('/orders/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const fileContent = await fs.readFile(req.file.path, 'utf-8');
        await orderController.processOrdersFromText(fileContent);
        res.status(200).json({ message: 'Arquivo TXT processado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
});

app.get('/orders', (req, res) => orderController.getOrders(req, res));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 