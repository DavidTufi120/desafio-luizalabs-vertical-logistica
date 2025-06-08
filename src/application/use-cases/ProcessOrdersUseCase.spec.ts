import { ProcessOrdersUseCase } from './ProcessOrdersUseCase';
import { Order } from '../../domain/entities/Order';

describe('ProcessOrdersUseCase', () => {
    it('should process raw data and call saveMany', async () => {
        const mockSaveMany = jest.fn();
        const mockRepository = { saveMany: mockSaveMany };
        const useCase = new ProcessOrdersUseCase(mockRepository as any);

        const rawData = [
            '0000000001                              Zarelli000000012300000001110000000122512.2420211201',
            '0000000002                          Medeiros00000123450000000111256.2420201201'
        ].join('\n');

        await useCase.execute(rawData);

        expect(mockSaveMany).toHaveBeenCalledTimes(1);
        const orders = mockSaveMany.mock.calls[0][0];
        expect(orders).toHaveLength(2);
        expect(orders[0]).toBeInstanceOf(Order);
        expect(orders[1]).toBeInstanceOf(Order);
    });

    it('should call saveMany if the repository implements it', async () => {
        // Arrange
        const mockSaveMany = jest.fn();
        const mockRepository = {
            saveMany: mockSaveMany
        };
        const useCase = new ProcessOrdersUseCase(mockRepository as any);

        const rawData = [
            '0000000001                              Zarelli000000012300000001110000000122512.2420211201',
            '0000000002                          Medeiros00000123450000000111256.2420201201'
        ].join('\n');

        // Act
        await useCase.execute(rawData);

        // Assert
        expect(mockSaveMany).toHaveBeenCalledTimes(1);
        // Checa se os objetos Order foram criados corretamente
        const orders = mockSaveMany.mock.calls[0][0];
        expect(orders).toHaveLength(2);
        expect(orders[0]).toBeInstanceOf(Order);
        expect(orders[1]).toBeInstanceOf(Order);
    });
});