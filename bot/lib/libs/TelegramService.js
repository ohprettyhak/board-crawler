"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const board_crawler_telegram_bot_json_1 = require("../configs/board-crawler-telegram-bot.json");
class TelegramService {
    constructor() {
        this.bot = new node_telegram_bot_api_1.default(board_crawler_telegram_bot_json_1.token, { polling: true });
    }
}
exports.default = TelegramService;
//# sourceMappingURL=TelegramService.js.map