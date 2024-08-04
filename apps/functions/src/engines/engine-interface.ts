import { Board } from "@/entities/board";
import { ArticleCrawlType } from "@/types/article";

export interface Engine {
  fetchNewArticleUrls(board: Board): Promise<string[]>;

  fetchArticleContent(url: string): Promise<ArticleCrawlType>;
}
