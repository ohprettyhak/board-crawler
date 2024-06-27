"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
class CurrentController {
    constructor(bot) {
        this.bot = bot;
    }
    async handleCurrentCommand(msg) {
        const chatId = msg.chat.id.toString();
        await this.bot.sendMessage(chatId, messages_1.PROMPT.CURRENT_SUBSCRIPTIONS);
    }
}
exports.default = CurrentController;
//# sourceMappingURL=current-controller.js.map