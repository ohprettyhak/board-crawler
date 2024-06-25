import { firestore } from "firebase-admin";

import FirebaseService from "@/libs/FirebaseService";

import Firestore = firestore.Firestore;

export default class FirestoreRepository {
  protected db: Firestore;

  constructor(firebase: FirebaseService) {
    this.db = firebase.firestore;
  }
}
