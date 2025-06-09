import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './infrastructure/database/config/typeorm.config';
import { orderRoutes } from './infrastructure/routes/orderRoutes';
import multer from 'multer';
import { logger } from './infrastructure/utils/logger';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(express.json());
app.use('/api', orderRoutes);

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
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
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Error during Data Source initialization:', error);
  });

export { app };
