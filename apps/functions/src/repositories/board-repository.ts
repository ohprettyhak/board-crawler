import { Service } from 'typedi';

import { COLLECTION } from '@/constants/store';
import { Board } from '@/entities/board';
import BaseRepository from '@/repositories/base-repository';

@Service()
export default class BoardRepository extends BaseRepository<Board> {
  async findById(id: string): Promise<Board | null> {
    const snapshot = await this.db.collectionGroup(COLLECTION.BOARDS).where('id', '==', id).get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as Board;
  }

  async findAll(): Promise<Board[]> {
    const snapshot = await this.db.collectionGroup(COLLECTION.BOARDS).get();
    return snapshot.docs.map(doc => doc.data() as Board);
  }

  async create(board: Board): Promise<void> {
    await this.db
      .collection(COLLECTION.ORGANIZATIONS)
      .doc(board.organizationId)
      .collection(COLLECTION.BOARDS)
      .doc(board.id)
      .withConverter(this.converter())
      .set(board);
  }
}
