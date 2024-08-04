import { Service } from "typedi";

import { Engine } from "@/engines/engine-interface";
import { Board } from "@/entities/board";
import ArticleRepository from "@/repositories/article-repository";
import { ArticleCrawlType } from "@/types/article";

import { fetchArticleContent, fetchBoardUrls } from "./helper";

@Service()
export class BuilderEngine implements Engine {
  constructor(private articleRepository: ArticleRepository) {}

  async fetchNewArticleUrls(board: Board): Promise<string[]> {
    const boardArticles: string[] = await fetchBoardUrls(board.url);

    const existingUrls: Set<string> = new Set(
      (await this.articleRepository.findTopArticlesByBoardId(board.id, 30)).map(
        article => article.url,
      ),
    );

    return boardArticles.filter(url => {
      return !Array.from(existingUrls).some(existingUrl => url.includes(existingUrl));
    });
  }

  async fetchArticleContent(url: string): Promise<ArticleCrawlType> {
    return await fetchArticleContent(url);
  }
}
