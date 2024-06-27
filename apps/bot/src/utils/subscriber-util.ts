import { firestore } from "@/libs/firebase-client";
import { Subscriber } from "@/models/subscriber";

const collection = firestore.collection("subscribers");

export async function getSubscriber(
  chatId: string,
): Promise<Subscriber | null> {
  const doc = await collection.doc(chatId).get();
  if (doc.exists) {
    return doc.data() as Subscriber;
  } else {
    return null;
  }
}

export async function updateSubscriber(
  chatId: string,
  subscribedBoards: string[],
): Promise<void> {
  const subscriber: Subscriber = { chatId, subscribedBoards };
  await collection.doc(chatId).set(subscriber, { merge: true });
}

export async function removeSubscriber(
  chatId: string,
  board: string,
): Promise<void> {
  const subscriber = await getSubscriber(chatId);
  if (subscriber) {
    subscriber.subscribedBoards = subscriber.subscribedBoards.filter(
      b => b !== board,
    );
    await updateSubscriber(chatId, subscriber.subscribedBoards);
  }
}
