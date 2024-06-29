import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
  DocumentData,
} from "firebase-admin/firestore";

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => {
    if (typeof data === "object" && data !== null) {
      return { ...data } as DocumentData;
    } else {
      throw new Error("Data is not an object");
    }
  },
  fromFirestore: (snap: QueryDocumentSnapshot): T => {
    return snap.data() as T;
  },
});
