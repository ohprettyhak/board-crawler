"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
class StartController {
    constructor(bot) {
        this.bot = bot;
    }
    async handleStartCommand(msg) {
        const chatId = msg.chat.id;
        await this.bot.sendMessage(chatId, messages_1.PROMPT.START);
    }
}
exports.default = StartController;
//# sourceMappingURL=start-controller.js.map