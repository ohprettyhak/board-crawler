import { Service } from "typedi";

import { COLLECTION } from "@/constants/store";
import { Generator } from "@/entities/generator";
import { FirebaseClient } from "@/libs/firebase-client";
import BaseRepository from "@/repositories/base-repository";

@Service()
export default class GeneratorRepository extends BaseRepository<Generator> {
  constructor(firebaseClient: FirebaseClient) {
    super(firebaseClient);
  }

  async createWithRef(
    generator: Generator,
  ): Promise<FirebaseFirestore.DocumentReference<Generator>> {
    const docRef = this.db.collection(COLLECTION.GENERATORS).withConverter(this.converter());
    return await docRef.add(generator);
  }

  subscribeToChanges(
    docRef: FirebaseFirestore.DocumentReference<Generator>,
    callback: (response: string) => void,
  ): void {
    docRef.onSnapshot(snap => {
      const data = snap.data();
      if (data && data.response) {
        callback(data.response);
      }
    });
  }
}
