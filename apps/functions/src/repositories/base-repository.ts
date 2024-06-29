import { Firestore } from "firebase-admin/firestore";
import { Service } from "typedi";

import { FirebaseClient } from "@/libs/firebase-client";

@Service()
export default class BaseRepository {
  protected db: Firestore;

  constructor(firebaseClient: FirebaseClient) {
    this.db = firebaseClient.firestore;
  }
}
