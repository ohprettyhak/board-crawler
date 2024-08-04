export interface Status {
  completeTime?: Date;
  startTime?: Date;
  state: string;
  updateTime?: Date;
}

export interface Generator {
  createTime?: Date;
  prompt: string;
  response?: string;
  status?: Status;
}
