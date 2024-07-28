import { Service } from "typedi";

import { Article } from "@/entities/article";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION_NAME: string = "articles";

@Service()
export default class ArticleRepository extends BaseRepository<Article> {
  async findTopArticlesByBoardId(
    boardId: string,
    limit: number,
  ): Promise<Article[]> {
    const articlesSnapshot = await this.db
      .collectionGroup(COLLECTION_NAME)
      .where("boardId", "==", boardId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    return articlesSnapshot.docs.map(doc => doc.data() as Article);
  }
}
