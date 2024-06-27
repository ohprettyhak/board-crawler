"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCommand = void 0;
const messages_1 = require("../constants/messages");
async function startCommand(bot, msg) {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, messages_1.PROMPT.START);
}
exports.startCommand = startCommand;
//# sourceMappingURL=start-controller.js.map