"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const start_controller_1 = __importDefault(require("../controllers/start-controller"));
const subscribe_controller_1 = __importDefault(require("../controllers/subscribe-controller"));
const current_controller_1 = __importDefault(require("../controllers/current-controller"));
const unsubscribe_controller_1 = __importDefault(require("../controllers/unsubscribe-controller"));
const callback_controller_1 = __importDefault(require("../controllers/callback-controller"));
class TelegramService {
    constructor(token) {
        this.editMessage = async (chatId, messageId, text, replyMarkup) => {
            await this.bot.editMessageText(text, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: replyMarkup,
            });
        };
        this.bot = new node_telegram_bot_api_1.default(token, { polling: true });
        this.startController = new start_controller_1.default(this.bot);
        this.subscribeController = new subscribe_controller_1.default(this.bot);
        this.currentController = new current_controller_1.default(this.bot);
        this.unsubscribeController = new unsubscribe_controller_1.default(this.bot);
        this.callbackController = new callback_controller_1.default(this.bot, this.editMessage);
    }
    start() {
        const commands = {
            "/start": this.startController.handleStartCommand.bind(this.startController),
            "/subscribe": this.subscribeController.handleSubscribeCommand.bind(this.subscribeController),
            "/unsubscribe": this.unsubscribeController.handleUnsubscribeCommand.bind(this.unsubscribeController),
            "/current": this.currentController.handleCurrentCommand.bind(this.currentController),
        };
        for (const [command, handler] of Object.entries(commands)) {
            this.bot.onText(new RegExp(command), msg => {
                handler(msg).catch(err => console.error(err));
            });
        }
        this.bot.on("callback_query", query => {
            this.callbackController
                .handleCallbackQuery(query)
                .catch(err => console.error(err));
        });
    }
}
exports.default = TelegramService;
//# sourceMappingURL=telegram-service.js.map