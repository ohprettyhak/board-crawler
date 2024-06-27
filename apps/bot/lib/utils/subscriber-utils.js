"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoardById = exports.save = exports.findById = void 0;
const firebase_client_1 = require("../libs/firebase-client");
const collection = firebase_client_1.firestore.collection("subscribers");
async function findById(chatId) {
    const doc = await collection.doc(chatId).get();
    if (doc.exists) {
        return doc.data();
    }
    else {
        return null;
    }
}
exports.findById = findById;
async function save(subscriber) {
    await collection.doc(subscriber.chatId).set(subscriber, { merge: true });
}
exports.save = save;
async function deleteBoardById(chatId, board) {
    const subscriber = await findById(chatId);
    if (subscriber) {
        subscriber.subscribedBoards = subscriber.subscribedBoards.filter(b => b !== board);
        await save(subscriber);
    }
}
exports.deleteBoardById = deleteBoardById;
//# sourceMappingURL=subscriber-utils.js.map