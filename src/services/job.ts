import IJob from "../models/job";
import IWindow from "../models/window";

import {
  getCounterProcesses,
  filterAndSortbyDate,
  convertToJobModel,
} from "../helpers/jobs";

const executeJobs = (jobs: any, window: IWindow, timeToExecute: number) => {
  //Lista final de jobs
  const toExecute = [];

  //Janela de execução: início e fim
  const windowInit = new Date(window.init);

  // Converte os jobs do tipo objeto simples para o tipo Job
  const convertedJobs = jobs.map((job: IJob) => convertToJobModel(job));

  //Filtra os jobs que estão dentro da janela de execução e ordena pela data de término do job
  //Obs: O job pode estar fora da janela somente se sua data máxima for antes do início da janela,
  //pois ele não tem data de início, correto?
  const eligibleJobs = filterAndSortbyDate(convertedJobs, windowInit);

  // Conta a quantidade de processos a serem executados, levando em consideração a soma
  // do valor de excução de cada job e o tempo de limite definido
  const counterProcess = getCounterProcesses(eligibleJobs, timeToExecute);

  // Obtém os jobs de acordo com a quantidade de processos.

  const toConsole = [];
  for (let i = 0; i < counterProcess; i++) {
    const result = getExecutionQueue(eligibleJobs, timeToExecute);

    toConsole.push(result.map((job) => job.id));
    toExecute.push(result);
  }

  console.log(toConsole);
  return toExecute;
};

const getExecutionQueue = (jobs: IJob[], limit: number) => {
  const resultProcesses = [];
  let sum = 0;
  let filteredJobs = jobs.filter((job) => !job.executed);

  //Os jobs que ainda não foram executados passam pela validação de tempo limite
  //e caso a validação seja positiva a variável "sum" incrementa seu valor estimado
  //para validar os próximos jobs
  for (let i = 0; i < filteredJobs.length; i++) {
    if (sum + filteredJobs[i].estimatedTime <= limit) {
      sum += filteredJobs[i].estimatedTime;
      resultProcesses.push(filteredJobs[i]);
      filteredJobs[i].executed = true;
    }
  }

  return resultProcesses;
};

export { executeJobs, getExecutionQueue };
