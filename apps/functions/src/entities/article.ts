export interface Article {
  author: string;
  boardId: string;
  content: string;
  createdAt?: Date;
  generatorId?: string;
  id: string;
  modifiedAt?: Date;
  organizationId: string;
  publishedAt: Date;
  title: string;
  url: string;
}

export interface ArticleCrawlType {
  title: string;
  content: string;
  timestamp: string;
  author: string;
}
