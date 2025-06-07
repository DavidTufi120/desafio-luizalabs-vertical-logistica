import { ProcessOrdersUseCase } from './ProcessOrdersUseCase';
import { InMemoryOrderRepository } from '../../infrastructure/services/InMemoryOrderRepository';

describe('ProcessOrdersUseCase', () => {
    it('should process raw data and save orders in repository', async () => {
        const repository = new InMemoryOrderRepository();
        const useCase = new ProcessOrdersUseCase(repository);

        const rawData = [
            '0000000001                              Zarelli000000012300000001110000000122512.2420211201',
            '0000000002                          Medeiros00000123450000000111256.2420201201'
        ].join('\n');

        await useCase.execute(rawData);

        const allOrders = await repository.findAll();
        expect(allOrders.length).toBeGreaterThan(0);
        expect(allOrders[0].getUserName()).toBeDefined();
    });
});