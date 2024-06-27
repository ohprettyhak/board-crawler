"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const keyboard_utils_1 = require("../utils/keyboard-utils");
class UnsubscribeController {
    constructor(bot) {
        this.bot = bot;
    }
    async handleUnsubscribeCommand(msg) {
        const chatId = msg.chat.id.toString();
        const subscribedList = await (0, keyboard_utils_1.createRemoveSubscriptionKeyboard)(chatId);
        if (subscribedList) {
            await this.bot.sendMessage(chatId, messages_1.PROMPT.BOARD_UNSUBSCRIBE_SELECTION, subscribedList);
        }
        else {
            await this.bot.sendMessage(chatId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
        }
    }
}
exports.default = UnsubscribeController;
//# sourceMappingURL=unsubscribe-controller.js.map