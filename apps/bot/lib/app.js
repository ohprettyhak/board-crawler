"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_service_1 = __importDefault(require("./services/telegram-service"));
const telegram_bot_token_json_1 = require("./configs/telegram-bot-token.json");
const telegramService = new telegram_service_1.default(telegram_bot_token_json_1.token);
telegramService.start();
//# sourceMappingURL=app.js.map