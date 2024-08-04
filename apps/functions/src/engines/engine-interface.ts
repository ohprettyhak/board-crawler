import { ArticleCrawlType } from '@/entities/article';
import { Board } from '@/entities/board';

export interface Engine {
  fetchNewArticleUrls(board: Board): Promise<string[]>;

  fetchArticleContent(url: string): Promise<ArticleCrawlType>;
}
