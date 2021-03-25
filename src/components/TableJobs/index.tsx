import React from "react";
import IJob from "../../models/job";

import { Table } from "./styles";

interface TableProps {
  jobs: IJob[];
}

const TableJobs: React.FC<TableProps> = ({ jobs }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th className="desc">Descrição</th>
          <th>Data Limite</th>
          <th>Tempo Estimado</th>
        </tr>
      </thead>
      <tbody>
        {jobs &&
          jobs.length &&
          jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.id}</td>
              <td className="desc">{job.description}</td>
              <td>{job.maxDate.toLocaleString("pt-BR")}</td>
              <td>{job.estimatedTime}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableJobs;
