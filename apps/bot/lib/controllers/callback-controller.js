"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackQuery = void 0;
const subscription_service_1 = require("../services/subscription-service");
const keyboard_utils_1 = require("../utils/keyboard-utils");
const messages_1 = require("../constants/messages");
async function callbackQuery(bot, query) {
    var _a, _b;
    const chatId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.chat.id.toString();
    const messageId = (_b = query.message) === null || _b === void 0 ? void 0 : _b.message_id;
    const action = query.data;
    if (!chatId || !action || !messageId)
        return;
    switch (action) {
        case "hufs":
            await bot.editMessageText(messages_1.PROMPT.SUBSCRIBE, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: (0, keyboard_utils_1.createHUFSBoardKeyboard)()
                    .reply_markup,
            });
            break;
        case "unsubscribe":
            await (0, subscription_service_1.handleUnsubscribe)(bot, chatId);
            break;
        case "current":
            await (0, subscription_service_1.handleCurrentSubscription)(bot, chatId);
            break;
        case "soft":
        case "computer":
            await (0, subscription_service_1.handleBoardSelection)(bot, chatId, action);
            break;
        case "back_to_organization":
            await bot.editMessageText(messages_1.PROMPT.BOARD_SELECTION, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: (0, keyboard_utils_1.createOrganizationKeyboard)()
                    .reply_markup,
            });
            break;
        default:
            break;
    }
}
exports.callbackQuery = callbackQuery;
//# sourceMappingURL=callback-controller.js.map