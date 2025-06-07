import request from 'supertest';
import { app, orderController } from '../index';
import path from 'path';
import { InMemoryOrderRepository } from '../infrastructure/services/InMemoryOrderRepository';

describe('Orders API Integration', () => {
    it('should upload a txt file and return success', async () => {
        const filePath = path.join(__dirname, '../../verticial-logistica/data_1.txt');
        const response = await request(app)
            .post('/orders/upload')
            .attach('file', filePath);

        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/processado com sucesso/i);
    });

    it('should return normalized orders on GET /orders', async () => {
        const response = await request(app).get('/orders');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if getOrders throws', async () => {
        jest.spyOn(InMemoryOrderRepository.prototype, 'findAll').mockImplementationOnce(() => {
            throw new Error('Simulated error');
        });
        const response = await request(app).get('/orders');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });

    it('should return empty array if order_id filter does not match', async () => {
        const response = await request(app).get('/orders?order_id=999999');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return empty array if start_date filter excludes all', async () => {
        const response = await request(app).get('/orders?start_date=2099-01-01');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return empty array if end_date filter excludes all', async () => {
        const response = await request(app).get('/orders?end_date=1999-01-01');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return 400 if no file is uploaded', async () => {
        const response = await request(app)
            .post('/orders/upload');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'No file uploaded');
    });

    it('should return 500 if an error occurs during file processing', async () => {
        jest.spyOn(orderController, 'processOrdersFromText').mockImplementationOnce(() => {
            throw new Error('Simulated processing error');
        });

        const filePath = path.join(__dirname, '../../verticial-logistica/data_1.txt');
        const response = await request(app)
            .post('/orders/upload')
            .attach('file', filePath);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Erro ao processar o arquivo');
    })
}); 