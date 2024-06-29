import { Service } from "typedi";

import { Article } from "@/entities/article";
import BaseRepository from "@/repositories/base-repository";

@Service()
export class ArticleRepository extends BaseRepository {
  async getTopArticles(boardId: string, limit: number): Promise<Article[]> {
    const articlesSnapshot = await this.db
      .collectionGroup("articles")
      .where("boardId", "==", boardId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    return articlesSnapshot.docs.map(doc => doc.data() as Article);
  }
}
