import { Service } from 'typedi';

import { Engine } from '@/engines/engine-interface';
import { ArticleCrawlType } from '@/entities/article';
import { Board } from '@/entities/board';
import ArticleRepository from '@/repositories/article-repository';

import { fetchArticleContent, fetchBoardUrls } from './helper';

@Service()
export class BuilderEngine implements Engine {
  constructor(private articleRepository: ArticleRepository) {}

  async fetchArticleUrls(board: Board): Promise<string[]> {
    const fetchedArticles: string[] = await fetchBoardUrls(board.url);

    const uniqueBoardArticles: Set<string> = new Set(fetchedArticles);

    const existingArticleUrls: Set<string> = new Set(
      (await this.articleRepository.findTopArticlesByBoardId(board.id, 30)).map(
        article => article.url,
      ),
    );

    return Array.from(uniqueBoardArticles).filter(url => {
      return !Array.from(existingArticleUrls).some(existingUrl => existingUrl.includes(url));
    });
  }

  async fetchArticleContent(url: string): Promise<ArticleCrawlType> {
    return await fetchArticleContent(url);
  }
}
