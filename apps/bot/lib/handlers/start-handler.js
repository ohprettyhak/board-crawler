"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStartCommand = void 0;
const Message_1 = require("../constants/Message");
async function handleStartCommand(bot, msg) {
    const chatId = msg.chat.id.toString();
    await bot.sendMessage(chatId, Message_1.PROMPT.WELCOME);
}
exports.handleStartCommand = handleStartCommand;
//# sourceMappingURL=start-handler.js.map