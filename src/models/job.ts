interface Job {
  id: number;
  description: string;
  maxDate: Date;
  estimatedTime: number;
  executed?: boolean;
}

export default Job;
