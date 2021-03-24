import IJob from "../models/job";
import IWindow from "../models/window";

const executeJobs = (jobs: any, window: IWindow) => {
  const toExecute = [];

  //Tempo máximo de execução de cada Job
  const timeToExecute = 8;

  //Janela de execução: início e fim
  const windowInit = new Date(window.init);
  const windowEnd = new Date(window.end);

  const convertedJobs = jobs.map((job: any) => {
    return convertToJobModel(job);
  });
  const eligibleJobs = filterAndSortbyDate(
    convertedJobs,
    windowInit,
    windowEnd
  );
  const counterProcess = getCounterProcesses(eligibleJobs);

  for (let i = 0; i < counterProcess; i++) {
    const result = getExecutionQueue(eligibleJobs, timeToExecute);
    toExecute.push(result);
  }

  return toExecute;
};

const filterAndSortbyDate = (jobs: IJob[], init: Date, end: Date) => {
  return jobs
    .filter((job: IJob) => job.maxDate >= init && job.maxDate <= end)
    .sort((a, b) => {
      return <any>a.maxDate - <any>b.maxDate;
    });
};

const convertToJobModel = (object: any): IJob => {
  return {
    id: object.id,
    description: object.description,
    maxDate: new Date(object.maxDate),
    executed: false,
    estimatedTime:
      parseInt(object.estimatedTime) ||
      parseInt(object.estimatedTime.split(" ")[0]),
  };
};

const getCounterProcesses = (jobs: IJob[]) => {
  return Math.ceil(
    jobs.reduce((total: number, job: IJob) => {
      return total + job.estimatedTime;
    }, 0) / 8
  );
};

const getExecutionQueue = (jobs: IJob[], limit: number) => {
  const resultProcesses = [];
  let sum = 0;
  let filteredJobs = jobs.filter((job) => job.executed === false);

  for (let i = 0; i < filteredJobs.length; i++) {
    if (sum + filteredJobs[i].estimatedTime <= limit) {
      sum += filteredJobs[i].estimatedTime;
      resultProcesses.push(filteredJobs[i].id);
      filteredJobs[i].executed = true;
    }
  }

  return resultProcesses;
};

export {
  executeJobs,
  getCounterProcesses,
  getExecutionQueue,
  filterAndSortbyDate,
  convertToJobModel,
};
