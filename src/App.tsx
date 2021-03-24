import React from "react";

import { executeJobs } from "./services/job";
import jobs from "./data/jobs.json";

const executionWindow = {
  init: "2019-11-10 09:00:00",
  end: "2019-11-11 12:00:00",
};

function App() {
  return <div>{JSON.stringify(executeJobs(jobs, executionWindow))}</div>;
}

export default App;
