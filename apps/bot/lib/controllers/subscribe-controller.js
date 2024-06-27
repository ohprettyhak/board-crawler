"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeCommand = void 0;
const messages_1 = require("../constants/messages");
const keyboard_utils_1 = require("../utils/keyboard-utils");
async function subscribeCommand(bot, msg) {
    const chatId = msg.chat.id.toString();
    await bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIBE, (0, keyboard_utils_1.createOrganizationKeyboard)());
}
exports.subscribeCommand = subscribeCommand;
//# sourceMappingURL=subscribe-controller.js.map