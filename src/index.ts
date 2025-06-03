import express from 'express';
import orderRoutes from './infrastructure/routes/orderRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 