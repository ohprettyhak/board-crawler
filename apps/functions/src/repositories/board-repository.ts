import { Service } from "typedi";

import { Board } from "@/entities/board";
import { converter } from "@/libs/firestore-converter";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION: string = "boards";

@Service()
export class BoardRepository extends BaseRepository {
  async findAll(): Promise<Board[]> {
    const snapshot = await this.db.collectionGroup(COLLECTION).get();
    return snapshot.docs.map(doc => doc.data() as Board);
  }

  async save(board: Board): Promise<void> {
    await this.db
      .collection("organizations")
      .doc(board.organizationId)
      .collection(COLLECTION)
      .doc(board.id)
      .withConverter(converter<Board>())
      .set(board);
  }
}
