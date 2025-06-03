# Vertical Logística - LuizaLabs Challenge

Este projeto é uma solução para o desafio técnico da LuizaLabs, focado na vertical de logística.

## Descrição

O sistema recebe um arquivo via API REST e processa-o para ser retornado via API REST. O arquivo de entrada possui uma estrutura em que cada linha representa uma parte de um pedido, com dados padronizados por tamanho de seus valores.

## Estrutura do Projeto

O projeto segue os princípios SOLID e Clean Architecture, com a seguinte estrutura:

```
src/
├── domain/           # Camada de domínio
│   ├── entities/     # Entidades do negócio
│   └── interfaces/   # Interfaces do domínio
├── application/      # Camada de aplicação
│   └── use-cases/    # Casos de uso
├── infrastructure/   # Camada de infraestrutura
│   ├── controllers/  # Controladores da API
│   ├── routes/       # Rotas da API
│   └── services/     # Implementações concretas
└── shared/          # Código compartilhado
    ├── utils/       # Utilitários
    └── errors/      # Tratamento de erros
```

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Clean Architecture
- SOLID Principles

## Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm start
```

## API Endpoints

- `POST /process`: Recebe o arquivo de pedidos
- `GET /`: Retorna os pedidos processados
  - Query params:
    - `userId`: Filtra por ID do usuário
    - `orderId`: Filtra por ID do pedido

## Licença

Este projeto é parte do processo seletivo da LuizaLabs. 