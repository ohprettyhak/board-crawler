"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const telegram_bot_token_json_1 = require("../configs/telegram-bot-token.json");
const start_handler_1 = require("../handlers/start-handler");
const callback_handler_1 = require("../handlers/callback-handler");
const subscribe_handler_1 = require("../handlers/subscribe-handler");
class TelegramService {
    constructor() {
        this.bot = new node_telegram_bot_api_1.default(telegram_bot_token_json_1.token, { polling: true });
    }
    start() {
        this.bot.onText(/\/start/, this.handleStartCommand.bind(this));
        this.bot.onText(/\/subscribe/, this.handleSubscribeCommand.bind(this));
        this.bot.on("callback_query", this.handleCallbackQuery.bind(this));
    }
    handleStartCommand(msg) {
        (0, start_handler_1.handleStartCommand)(this.bot, msg).catch(err => console.error(err));
    }
    handleSubscribeCommand(msg) {
        (0, subscribe_handler_1.handleSubscribeCommand)(this.bot, msg).catch(err => console.error(err));
    }
    async handleCallbackQuery(query) {
        await (0, callback_handler_1.handleCallbackQuery)(this.bot, query);
    }
}
exports.default = TelegramService;
//# sourceMappingURL=telegram-service.js.map