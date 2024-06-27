"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const start_controller_1 = require("../controllers/start-controller");
const callback_controller_1 = require("../controllers/callback-controller");
const subscribe_controller_1 = require("../controllers/subscribe-controller");
class TelegramService {
    constructor(token) {
        this.bot = new node_telegram_bot_api_1.default(token, { polling: true });
    }
    start() {
        this.bot.onText(/\/start/, this.startCommand.bind(this));
        this.bot.onText(/\/subscribe/, this.subscribeCommand.bind(this));
        this.bot.on("callback_query", this.callbackQuery.bind(this));
    }
    startCommand(msg) {
        (0, start_controller_1.startCommand)(this.bot, msg).catch(err => console.error(err));
    }
    subscribeCommand(msg) {
        (0, subscribe_controller_1.subscribeCommand)(this.bot, msg).catch(err => console.error(err));
    }
    async callbackQuery(query) {
        await (0, callback_controller_1.callbackQuery)(this.bot, query);
    }
}
exports.default = TelegramService;
//# sourceMappingURL=telegram-service.js.map