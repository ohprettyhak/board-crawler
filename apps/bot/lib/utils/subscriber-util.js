"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSubscriber = exports.updateSubscriber = exports.getSubscriber = void 0;
const firebase_client_1 = require("../libs/firebase-client");
const collection = firebase_client_1.firestore.collection("subscribers");
async function getSubscriber(chatId) {
    const doc = await collection.doc(chatId).get();
    if (doc.exists) {
        return doc.data();
    }
    else {
        return null;
    }
}
exports.getSubscriber = getSubscriber;
async function updateSubscriber(chatId, subscribedBoards) {
    const subscriber = { chatId, subscribedBoards };
    await collection.doc(chatId).set(subscriber, { merge: true });
}
exports.updateSubscriber = updateSubscriber;
async function removeSubscriber(chatId, board) {
    const subscriber = await getSubscriber(chatId);
    if (subscriber) {
        subscriber.subscribedBoards = subscriber.subscribedBoards.filter(b => b !== board);
        await updateSubscriber(chatId, subscriber.subscribedBoards);
    }
}
exports.removeSubscriber = removeSubscriber;
//# sourceMappingURL=subscriber-util.js.map