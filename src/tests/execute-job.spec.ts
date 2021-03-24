import { getExecutionQueue, executeJobs } from "../services/job";

import {
  convertToJobModel,
  getCounterProcesses,
  filterAndSortbyDate,
} from "../helpers/jobs";

it("Testa da conversão do objeto recebido em string em um objeto do tipo Job", () => {
  const valuetoTest = {
    id: 1,
    description: "Importação de arquivos de fundos",
    maxDate: "2019-11-10 12:00:00",
    estimatedTime: "2 horas",
  };

  const result = convertToJobModel(valuetoTest);
  const expected = {
    id: 1,
    description: "Importação de arquivos de fundos",
    maxDate: new Date("2019-11-10 12:00:00"),
    estimatedTime: 2,
    executed: false,
  };

  expect(result).toStrictEqual(expected);
});

it("Teste da quantidade de processos que precisam ser executados levando em consideração o tempo máximo de cada (8)", () => {
  const value = [
    {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxDate: new Date("2019-11-10 12:00:00"),
      estimatedTime: 2,
    },
    {
      id: 2,
      description: "Importação de dados da Base Legada",
      maxDate: new Date("2019-11-11 12:00:00"),
      estimatedTime: 4,
    },
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 08:00:00"),
      estimatedTime: 6,
    },
  ];

  const result = getCounterProcesses(value, 8);
  const expected = 2;

  expect(result).toBe(expected);
});

it("Teste do filtra pela janela de execução e ordena com 2 jobs fora da janela", () => {
  const value = [
    {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxDate: new Date("2019-11-10 12:00:00"),
      estimatedTime: 2,
    },
    {
      id: 2,
      description: "Importação de dados da Base Legada",
      maxDate: new Date("2019-11-10 09:00:00"),
      estimatedTime: 4,
    },
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 08:00:00"),
      estimatedTime: 6,
    },
    {
      id: 4,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 15:01:00"),
      estimatedTime: 6,
    },
  ];

  const expected = [
    {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxDate: new Date("2019-11-10 12:00:00"),
      estimatedTime: 2,
    },
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 08:00:00"),
      estimatedTime: 6,
    },
  ];

  const result = filterAndSortbyDate(
    value,
    new Date("2019-11-10 10:00:00"),
    new Date("2019-11-11 15:00:00")
  );

  expect(result).toStrictEqual(expected);
});

it("Testa o retorno de processos não executados dentro to tempo limite com 2 processos que já foram executados e 1 que ultrapassa o limite", () => {
  const value = [
    {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxDate: new Date("2019-11-10 12:00:00"),
      estimatedTime: 2,
      executed: true,
    },
    {
      id: 2,
      description: "Importação de dados da Base Legada",
      maxDate: new Date("2019-11-10 13:00:00"),
      estimatedTime: 4,
      executed: true,
    },
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 08:00:00"),
      estimatedTime: 2,
    },
    {
      id: 4,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 9:00:00"),
      estimatedTime: 2,
    },
    {
      id: 5,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 15:01:00"),
      estimatedTime: 10,
    },
  ];

  const expected = [
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 08:00:00"),
      estimatedTime: 2,
      executed: true,
    },
    {
      id: 4,
      description: "Importação de dados de integração",
      maxDate: new Date("2019-11-11 9:00:00"),
      estimatedTime: 2,
      executed: true,
    },
  ];

  const result = getExecutionQueue(value, 9);
  expect(result).toStrictEqual(expected);
});

it("Testa toda o funcao de executar jobs, de acordo com o exemplo de massa de dados enviado no desafio", () => {
  const values = [
    {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxDate: "2019-11-10 12:00:00",
      estimatedTime: "2 horas",
    },
    {
      id: 2,
      description: "Importação de dados da Base Legada",
      maxDate: "2019-11-11 12:00:00",
      estimatedTime: "4 horas",
    },
    {
      id: 3,
      description: "Importação de dados de integração",
      maxDate: "2019-11-11 08:00:00",
      estimatedTime: "6 horas",
    },
  ];

  const expected = [
    [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxDate: new Date("2019-11-10 12:00:00"),
        estimatedTime: 2,
        executed: true,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxDate: new Date("2019-11-11 08:00:00"),
        estimatedTime: 6,
        executed: true,
      },
    ],
    [
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxDate: new Date("2019-11-11 12:00:00"),
        estimatedTime: 4,
        executed: true,
      },
    ],
  ];

  const windowExecute = {
    init: "2019-11-10 09:00:00",
    end: "2019-11-11 12:00:00",
  };
  const convertedJobs = values.map((job) => convertToJobModel(job));
  const result = executeJobs(convertedJobs, windowExecute, 8);

  expect(result).toStrictEqual(expected);
});
