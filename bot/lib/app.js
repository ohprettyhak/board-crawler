"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramService_1 = __importDefault(require("./libs/TelegramService"));
const telegramService = new TelegramService_1.default();
const startPolling = () => {
    telegramService.bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        console.log(`Received message from chat ID ${chatId}: ${text}`);
        telegramService.bot
            .sendMessage(chatId, `You said: ${text}`)
            .then(() => {
            console.log(`Message sent to chat ID ${chatId}: You said: ${text}`);
        })
            .catch((error) => {
            console.error(`Failed to send message to chat ID ${chatId}:`, error);
        });
    });
};
startPolling();
//# sourceMappingURL=app.js.map