import { ServiceAccount, firestore } from "firebase-admin";
import { App, cert, initializeApp } from "firebase-admin/app";

import serviceAccount from "@/configs/board-crawler-firebase-adminsdk.json";

import Firestore = firestore.Firestore;

export default class FirebaseService {
  private readonly app: App;
  public readonly firestore: Firestore;

  constructor() {
    this.app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
    this.firestore = firestore(this.app);
  }
}
