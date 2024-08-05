import { Service } from 'typedi';

import { COLLECTION } from '@/constants/store';
import { Subscriber } from '@/entities/subscriber';
import BaseRepository from '@/repositories/base-repository';

@Service()
export default class SubscriberRepository extends BaseRepository<Subscriber> {
  async findById(id: string): Promise<Subscriber | null> {
    try {
      const doc = await this.db.collection(COLLECTION.SUBSCRIBERS).doc(id).get();
      return doc.exists ? (doc.data() as Subscriber) : null;
    } catch (error) {
      console.error(`Error fetching organization with id ${id}: `, error);
      return null;
    }
  }

  async findByBoardId(boardId: string): Promise<Subscriber[]> {
    try {
      const snapshot = await this.db
        .collection(COLLECTION.SUBSCRIBERS)
        .where('boardId', '==', boardId)
        .get();
      return snapshot.docs.map(doc => doc.data() as Subscriber);
    } catch (error) {
      console.error(`Error fetching subscribers for board ${boardId}: `, error);
      return [];
    }
  }
}
