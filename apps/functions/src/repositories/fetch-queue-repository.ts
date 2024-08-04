import { DocumentData, FieldValue, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { Service } from 'typedi';

import { COLLECTION } from '@/constants/store';
import { FetchQueue } from '@/entities/fetch-queue';
import { FirebaseClient } from '@/libs/firebase-client';
import { ConverterMode } from '@/libs/firestore-converter';
import BaseRepository from '@/repositories/base-repository';

@Service()
export default class FetchQueueRepository extends BaseRepository<FetchQueue> {
  constructor(firebaseClient: FirebaseClient) {
    super(firebaseClient);
    this.converter = (mode?: ConverterMode) => ({
      toFirestore: (data: FetchQueue) => {
        const target: DocumentData = { ...data };
        if (mode === ConverterMode.CREATE) {
          target.createdAt = FieldValue.serverTimestamp();
        } else if (mode === ConverterMode.UPDATE) {
          target.modifiedAt = FieldValue.serverTimestamp();
        }
        return target;
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot): FetchQueue => {
        const data: DocumentData = snapshot.data();
        return {
          ...data,
          id: snapshot.id,
          createdAt: data.createdAt.toDate(),
        } as FetchQueue;
      },
    });
  }

  async create(fetchQueue: FetchQueue): Promise<void> {
    const docRef = this.db
      .collection(COLLECTION.FETCH_QUEUES)
      .doc(fetchQueue.id)
      .withConverter(this.converter());
    await docRef.set(fetchQueue);
  }

  async createAll(fetchQueues: FetchQueue[]): Promise<void> {
    const batch = this.db.batch();

    fetchQueues.forEach(fetchQueue => {
      const docRef = this.db
        .collection(COLLECTION.FETCH_QUEUES)
        .doc(fetchQueue.id)
        .withConverter(this.converter(ConverterMode.CREATE));
      batch.set(docRef, fetchQueue);
    });

    await batch.commit();
  }

  async update(fetchQueue: FetchQueue): Promise<void> {
    await this.db
      .collection(COLLECTION.FETCH_QUEUES)
      .doc(fetchQueue.id)
      .withConverter(this.converter(ConverterMode.UPDATE))
      .set(fetchQueue);
  }
}
