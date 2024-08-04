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
}
