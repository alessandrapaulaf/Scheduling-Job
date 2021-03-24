import IJob from "../../models/job";

const filterAndSortbyDate = (jobs: IJob[], init: Date) => {
  return jobs
    .filter((job: IJob) => job.maxDate >= init)
    .sort((a, b) => {
      return <any>a.maxDate - <any>b.maxDate;
    });
};

const convertToJobModel = (object: any): IJob => {
  return {
    id: parseInt(object.id),
    description: object.description,
    maxDate: new Date(object.maxDate),
    executed: false,
    estimatedTime:
      parseInt(object.estimatedTime) ||
      parseInt(object.estimatedTime.split(" ")[0]),
  };
};

const getCounterProcesses = (jobs: IJob[], timeLimitToProcess: number) => {
  return Math.ceil(
    jobs.reduce((total: number, job: IJob) => {
      return total + job.estimatedTime;
    }, 0) / timeLimitToProcess
  );
};

const getOutsideWindowExecute = (jobs: any[], init: string) => {
  return jobs.filter((job) => job.maxDate <= init);
};

const getOutsideLimitExecution = (jobs: any[], limitTime: number) => {
  return jobs.filter((job) => {
    const estimated =
      parseInt(job.estimatedTime) || parseInt(job.estimatedTime.split(" ")[0]);

    return estimated > limitTime;
  });
};

export {
  filterAndSortbyDate,
  convertToJobModel,
  getCounterProcesses,
  getOutsideWindowExecute,
  getOutsideLimitExecution,
};
