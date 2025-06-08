import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './infrastructure/database/config/typeorm.config';
import { orderRoutes } from './infrastructure/routes/orderRoutes';
import multer from 'multer';

const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

// Middleware de tratamento de erro do Multer
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ error: 'Only one file can be uploaded at a time.' });
        }
        return res.status(400).json({ error: err.message });
    }
    return next(err);
});

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