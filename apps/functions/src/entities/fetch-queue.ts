export interface FetchQueue {
  boardId: string;
  createdAt?: Date;
  engine: string;
  generatorId?: string;
  id: string;
  modifiedAt?: Date;
  organizationId: string;
  processed: boolean;
  url: string;
}
