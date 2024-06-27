"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
class UnsubscribeController {
    constructor(bot) {
        this.bot = bot;
    }
    async handleUnsubscribeCommand(msg) {
        const chatId = msg.chat.id.toString();
        await this.bot.sendMessage(chatId, messages_1.PROMPT.UNSUBSCRIBED);
    }
}
exports.default = UnsubscribeController;
//# sourceMappingURL=unsubscribe-controller.js.map