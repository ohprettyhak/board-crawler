export interface Article {
  title: string;
  content: string;
  url: string;
  boardId: string;
  createdAt?: string;
  crawledAt?: string;
}
