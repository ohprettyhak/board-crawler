import { firestore } from "firebase-admin";
import { App, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Service } from "typedi";

@Service()
export class FirebaseClient {
  private readonly app: App;
  public readonly firestore: firestore.Firestore;

  constructor() {
    this.app = initializeApp();
    this.firestore = getFirestore(this.app);
    this.firestore.settings({ ignoreUndefinedProperties: true });
  }
}
