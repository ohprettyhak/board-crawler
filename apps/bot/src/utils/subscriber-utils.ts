import { firestore } from "@/libs/firebase-client";
import { Subscriber } from "@/models/subscriber";

const collection = firestore.collection("subscribers");

export async function findById(chatId: string): Promise<Subscriber | null> {
  const doc = await collection.doc(chatId).get();
  if (doc.exists) {
    return doc.data() as Subscriber;
  } else {
    return null;
  }
}

export async function save(subscriber: Subscriber): Promise<void> {
  await collection.doc(subscriber.chatId).set(subscriber, { merge: true });
}

export async function deleteBoardById(
  chatId: string,
  board: string,
): Promise<void> {
  const subscriber = await findById(chatId);
  if (subscriber) {
    subscriber.subscribedBoards = subscriber.subscribedBoards.filter(
      b => b !== board,
    );
    await save(subscriber);
  }
}
