import axios from "axios";
import * as cheerio from "cheerio";
import { Service } from "typedi";

import { Engine } from "@/engines/engine-interface";
import { Board } from "@/entities/board";
import { ArticleRepository } from "@/repositories/article-repository";

@Service()
export class BuilderEngine implements Engine {
  constructor(private articleRepository: ArticleRepository) {}

  async crawl(board: Board): Promise<string[]> {
    const boardArticles: string[] = await this.fetchBoardUrls(board.url);

    const existingUrls: Set<string> = new Set(
      (await this.articleRepository.getTopArticles(board.id, 20)).map(
        article => article.url,
      ),
    );

    return boardArticles.filter(url => !existingUrls.has(url));
  }

  public async fetchBoardUrls(boardUrl: string): Promise<string[]> {
    try {
      const response = await axios.get(boardUrl);
      const $ = cheerio.load(response.data);
      return $("table tbody tr td a")
        .map((_, element) => $(element).attr("href"))
        .get()
        .filter((url): url is string => !!url);
    } catch (error) {
      console.error("Error fetching board URLs:", error);
      throw error;
    }
  }
}
