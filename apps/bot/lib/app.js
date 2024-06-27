"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_service_1 = __importDefault(require("./services/telegram-service"));
const telegramService = new telegram_service_1.default();
telegramService.start();
//# sourceMappingURL=app.js.map