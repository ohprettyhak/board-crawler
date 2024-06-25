"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const app_1 = require("firebase-admin/app");
const board_crawler_firebase_adminsdk_json_1 = __importDefault(require("../configs/board-crawler-firebase-adminsdk.json"));
class FirebaseService {
    constructor() {
        this.app = (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(board_crawler_firebase_adminsdk_json_1.default),
        });
        this.firestore = (0, firebase_admin_1.firestore)(this.app);
    }
}
exports.default = FirebaseService;
//# sourceMappingURL=FirebaseService.js.map