"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSubscribeCommand = void 0;
const Message_1 = require("../constants/Message");
const keyboard_util_1 = require("../utils/keyboard-util");
async function handleSubscribeCommand(bot, msg) {
    const chatId = msg.chat.id.toString();
    await bot.sendMessage(chatId, Message_1.PROMPT.SUBSCRIBE, (0, keyboard_util_1.createOrganizationKeyboard)());
}
exports.handleSubscribeCommand = handleSubscribeCommand;
//# sourceMappingURL=subscribe-handler.js.map