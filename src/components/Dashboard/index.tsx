import React, { useEffect, useState } from "react";
import IJob from "../../models/job";

import ProgressBar from "../ProgressBar";
import TableJobs from "../TableJobs";
import dataJobs from "../../data/jobs.json";

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
    const result = await executeJobs(dataJobs, windowExecute, limitExecution);

    setJobsExecute(
      result.reduce((total: number, queue: IJob[]) => {
        return total + queue.length;
      }, 0)
    );

    setJobsOutsideWindow(
      getOutsideWindowExecute(dataJobs, windowExecute.init).length
    );

    setSuperiorTime(getOutsideLimitExecution(dataJobs, limitExecution).length);

    setQueues(result);
  };

  useEffect(() => {
    getQueues();
  }, []);

  return (
    <Container>
      <Card>
        <ProgressContent>
          <h2>{`Total de Jobs: ${dataJobs.length}`}</h2>
          <ProgressCard className="card--green">
            <ProgressBar
              color="#2bab51"
              percentual={Math.round((executed / dataJobs.length) * 100)}
            />
            <div>
              <span>{executed}</span>
              <h3>Jobs executáveis</h3>
            </div>
          </ProgressCard>
          <ProgressCard className="card--yellow">
            <ProgressBar
              color="#e88e3c"
              percentual={Math.round((outsideWindow / dataJobs.length) * 100)}
            />
            <div>
              <span>{outsideWindow}</span>
              <h3>Jobs fora da janela de execução</h3>
            </div>
          </ProgressCard>
          <ProgressCard className="card--red">
            <ProgressBar
              color="#e81760"
              percentual={Math.round((superiorTime / dataJobs.length) * 100)}
            />
            <div>
              <span>{superiorTime}</span>
              <h3>Jobs com tempo estimado superior ao limite</h3>
            </div>
          </ProgressCard>
        </ProgressContent>
        <TableContent>
          <h2>Filas de execução</h2>
          <TablesContainer>
            {queues &&
              queues.length &&
              queues.map((process: any) => <TableJobs jobs={process} />)}
          </TablesContainer>
        </TableContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
