import IJob from "../../models/job";

const filterAndSortbyDate = (jobs: IJob[], init: Date, end: Date) => {
  return jobs
    .filter((job: IJob) => job.maxDate >= init && job.maxDate <= end)
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

export { filterAndSortbyDate, convertToJobModel, getCounterProcesses };
