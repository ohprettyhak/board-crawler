import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Service } from "typedi";

import { COLLECTION } from "@/constants/store";
import { Article } from "@/entities/article";
import { FirebaseClient } from "@/libs/firebase-client";
import { ConverterMode } from "@/libs/firestore-converter";
import BaseRepository from "@/repositories/base-repository";

@Service()
export default class ArticleRepository extends BaseRepository<Article> {
  constructor(firebaseClient: FirebaseClient) {
    super(firebaseClient);
    this.converter = (mode?: ConverterMode) => ({
      toFirestore: (data: Article) => {
        const target: DocumentData = { ...data };
        if (mode === ConverterMode.CREATE) {
          target.createdAt = FieldValue.serverTimestamp();
        } else if (mode === ConverterMode.UPDATE) {
          target.modifiedAt = FieldValue.serverTimestamp();
        }
        return target;
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot): Article => {
        const data: DocumentData = snapshot.data();
        return {
          ...data,
          id: snapshot.id,
          createdAt: data.createdAt.toDate(),
          modifiedAt: data.crawledAt.toDate(),
        } as Article;
      },
    });
  }

  async findTopArticlesByBoardId(boardId: string, limit: number): Promise<Article[]> {
    const articlesSnapshot = await this.db
      .collectionGroup(COLLECTION.ARTICLES)
      .where("boardId", "==", boardId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    return articlesSnapshot.docs.map(doc => doc.data() as Article);
  }

  async create(article: Article): Promise<void> {
    await this.db
      .collection(COLLECTION.ORGANIZATIONS)
      .doc(article.organizationId)
      .collection(COLLECTION.BOARDS)
      .doc(article.boardId)
      .collection(COLLECTION.ARTICLES)
      .doc(article.id)
      .withConverter(this.converter(ConverterMode.CREATE))
      .set(article);
  }
}
