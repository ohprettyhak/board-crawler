export interface FetchQueue {
  id: string;
  url: string;
  boardId: string;
  processed: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
}
