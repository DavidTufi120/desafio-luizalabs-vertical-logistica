import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './infrastructure/database/config/typeorm.config';
import { orderRoutes } from './infrastructure/routes/orderRoutes';

const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    }); 