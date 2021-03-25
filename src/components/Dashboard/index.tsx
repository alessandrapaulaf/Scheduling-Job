import React, { useEffect, useState } from "react";
import IJob from "../../models/job";

import ProgressBar from "../ProgressBar";
import TableJobs from "../TableJobs";
import { jobs } from "../../data/jobs";

import { executeJobs } from "../../services/job";
import {
  getOutsideWindowExecute,
  getOutsideLimitExecution,
} from "../../helpers/jobs";

import {
  Container,
  Card,
  ProgressContent,
  TableContent,
  ProgressCard,
  TablesContainer,
  HeaderJobs,
} from "./styles";

const windowExecute = {
  init: "2019-11-10 09:00:00",
  end: "2019-11-11 12:00:00",
};

const limitExecution = 8;

const Dashboard: React.FC = () => {
  const [queues, setQueues] = useState<any>();
  const [executed, setJobsExecute] = useState<number>(0);
  const [outsideWindow, setJobsOutsideWindow] = useState<number>(0);
  const [superiorTime, setSuperiorTime] = useState<number>(0);

  const getQueues = async () => {
    const result = await executeJobs(jobs, windowExecute, limitExecution);

    setJobsExecute(
      result.reduce((total: number, queue: IJob[]) => {
        return total + queue.length;
      }, 0)
    );

    setJobsOutsideWindow(
      getOutsideWindowExecute(jobs, windowExecute.init).length
    );

    setSuperiorTime(getOutsideLimitExecution(jobs, limitExecution).length);

    setQueues(result);
  };

  useEffect(() => {
    getQueues();
  }, []);

  return (
    <Container>
      <Card>
        <ProgressContent>
          <h2>{`Total de Jobs: ${jobs.length}`}</h2>

          <ProgressCard className="card--green">
            <ProgressBar
              color="#2bab51"
              percentual={Math.round((executed / jobs.length) * 100)}
            />
            <div>
              <span>{executed}</span>
              <h3>Jobs executáveis</h3>
            </div>
          </ProgressCard>
          <ProgressCard className="card--yellow">
            <ProgressBar
              color="#e88e3c"
              percentual={Math.round((outsideWindow / jobs.length) * 100)}
            />
            <div>
              <span>{outsideWindow}</span>
              <h3>Jobs fora da janela de execução</h3>
            </div>
          </ProgressCard>
          <ProgressCard className="card--red">
            <ProgressBar
              color="#e81760"
              percentual={Math.round((superiorTime / jobs.length) * 100)}
            />
            <div>
              <span>{superiorTime}</span>
              <h3>Jobs com tempo estimado superior ao limite</h3>
            </div>
          </ProgressCard>
        </ProgressContent>
        <TableContent>
          <HeaderJobs>
            <h2>Filas de execução</h2>
            <div className="window-exec">
              <span>Janela de execução:</span>
              <span>{` ${windowExecute.init} até`}</span>
              <span>{` ${windowExecute.end}`}</span>
            </div>
          </HeaderJobs>
          <TablesContainer>
            {queues &&
              queues.length &&
              queues.map((process: any, index: number) => (
                <TableJobs key={index} jobs={process} />
              ))}
          </TablesContainer>
        </TableContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
