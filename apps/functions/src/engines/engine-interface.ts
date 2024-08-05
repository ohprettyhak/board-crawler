import { ArticleCrawlType } from '@/entities/article';
import { Board } from '@/entities/board';

export interface Engine {
  fetchArticleUrls(board: Board): Promise<string[]>;

  fetchArticleContent(url: string): Promise<ArticleCrawlType>;
}
