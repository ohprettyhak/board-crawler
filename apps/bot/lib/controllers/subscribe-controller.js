"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const keyboard_utils_1 = require("../utils/keyboard-utils");
class SubscribeController {
    constructor(bot) {
        this.bot = bot;
    }
    async handleSubscribeCommand(msg) {
        const chatId = msg.chat.id.toString();
        await this.bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIBE, (0, keyboard_utils_1.createOrganizationKeyboard)());
    }
}
exports.default = SubscribeController;
//# sourceMappingURL=subscribe-controller.js.map