import { Service } from "typedi";

import { Board } from "@/entities/board";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION_NAME: string = "boards";

@Service()
export default class BoardRepository extends BaseRepository<Board> {
  async findAll(): Promise<Board[]> {
    const snapshot = await this.db.collectionGroup(COLLECTION_NAME).get();
    return snapshot.docs.map(doc => doc.data() as Board);
  }

  async create(board: Board): Promise<void> {
    await this.db
      .collection("organizations")
      .doc(board.organizationId)
      .collection(COLLECTION_NAME)
      .doc(board.id)
      .withConverter(this.converter())
      .set(board);
  }
}
