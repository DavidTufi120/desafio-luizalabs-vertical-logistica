import { ProcessOrdersUseCase } from '../application/use-cases/ProcessOrdersUseCase';
import { InMemoryOrderRepository } from '../infrastructure/services/InMemoryOrderRepository';
import { FileDataService } from '../infrastructure/services/FileDataService';

async function testOrderParsing() {
    const fileService = new FileDataService();
    const orderRepository = new InMemoryOrderRepository();
    const processOrdersUseCase = new ProcessOrdersUseCase(orderRepository);

    // Lê o conteúdo dos arquivos
    const content = await fileService.readDataFiles('verticial-logistica');

    // Processa os dados
    for (const fileContent of content) {
        await processOrdersUseCase.execute(fileContent);
    }

    // Busca todos os pedidos processados
    const orders = await orderRepository.findAll();

    // Exibe os primeiros 5 pedidos no formato JSON
    console.log('\nPrimeiros 5 pedidos processados:');
    orders.slice(0, 5).forEach(order => {
        console.log(JSON.stringify(order.toJSON(), null, 2));
    });
}

testOrderParsing().catch(console.error); 