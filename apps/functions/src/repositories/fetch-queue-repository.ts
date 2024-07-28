import {
  DocumentData,
  FieldValue,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Service } from "typedi";

import { FetchQueue } from "@/entities/fetch-queue";
import { FirebaseClient } from "@/libs/firebase-client";
import { ConverterMode } from "@/libs/firestore-converter";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION_NAME: string = "fetch_queues";

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
          boardId: "",
          processed: false,
          url: "",
          createdAt: data.createdAt.toDate(),
        } as FetchQueue;
      },
    });
  }

  async create(fetchQueue: FetchQueue): Promise<void> {
    const docRef = this.db
      .collection(COLLECTION_NAME)
      .doc()
      .withConverter(this.converter());
    await docRef.set(fetchQueue);
  }

  async createAll(fetchQueues: FetchQueue[]): Promise<void> {
    const batch = this.db.batch();

    fetchQueues.forEach(fetchQueue => {
      const docRef = this.db
        .collection(COLLECTION_NAME)
        .doc()
        .withConverter(this.converter(ConverterMode.CREATE));
      batch.set(docRef, fetchQueue);
    });

    await batch.commit();
  }
}
