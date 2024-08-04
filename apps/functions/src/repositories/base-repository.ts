import { Firestore, FirestoreDataConverter } from 'firebase-admin/firestore';
import { Service } from 'typedi';

import { FirebaseClient } from '@/libs/firebase-client';
import { converter, ConverterMode } from '@/libs/firestore-converter';

@Service()
export default class BaseRepository<T> {
  protected db: Firestore;
  protected converter: (mode?: ConverterMode) => FirestoreDataConverter<T>;

  constructor(firebaseClient: FirebaseClient) {
    this.db = firebaseClient.firestore;
    this.converter = () => converter<T>();
  }
}
