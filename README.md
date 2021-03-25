# Desafio Scheduling Jobs

Nesse repositório contém a resolução do desafio Scheduling jobs, onde é disponlibilizado um array de "jobs" para execução, no qual cada posição possui um objeto com os atributos:

1. ID: Identificação do Job;
2. Descrição: Descrição do Job;
3. Data Máxima de conclusão do Job: Data máxima em que o Job deve ser concluído;
4. Tempo estimado: Tempo estimado de execução do Job.

Regras a serem seguidas:

- [x] Cada array do conjunto representa uma lista de Jobs a serem executados em sequência;
- [x] Cada array deve conter jobs que sejam executados em, no máximo, 8h;
- [x] Deve ser respeitada a data máxima de conclusão do Job;
- [x] Todos os Jobs devem ser executados dentro da janela de execução (data início e fim).

Para instalar as dependências:

### `yarn install`

Para realizar os testes:

### `yarn jest`

Para iniciar a aplicação web:

### `yarn start`
