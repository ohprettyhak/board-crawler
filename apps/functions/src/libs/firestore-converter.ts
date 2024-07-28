import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
  DocumentData,
} from "firebase-admin/firestore";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export enum ConverterMode {
  CREATE,
  UPDATE,
  READ,
  DELETE,
}

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => {
    if (isObject(data)) return { ...data } as DocumentData;
    else throw new Error("Data is not an object");
  },
  fromFirestore: (snap: QueryDocumentSnapshot): T => {
    return snap.data() as T;
  },
});
