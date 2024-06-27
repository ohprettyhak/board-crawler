"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = exports.firebaseApp = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const firebase_adminsdk_json_1 = __importDefault(require("../configs/firebase-adminsdk.json"));
const firebaseApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(firebase_adminsdk_json_1.default),
});
exports.firebaseApp = firebaseApp;
const firestoreDB = (0, firestore_1.getFirestore)(firebaseApp);
exports.firestore = firestoreDB;
//# sourceMappingURL=firebase-client.js.map