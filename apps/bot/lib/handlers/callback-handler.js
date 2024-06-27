"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCallbackQuery = void 0;
const Message_1 = require("../constants/Message");
const keyboard_util_1 = require("../utils/keyboard-util");
async function handleCallbackQuery(bot, query) {
    var _a, _b;
    const chatId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.chat.id.toString();
    const messageId = (_b = query.message) === null || _b === void 0 ? void 0 : _b.message_id;
    const action = query.data;
    if (!chatId || !action || !messageId)
        return;
    switch (action) {
        case "hufs":
            await bot.editMessageText(Message_1.PROMPT.SUBSCRIBE, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: (0, keyboard_util_1.createHUFSBoardKeyboard)()
                    .reply_markup,
            });
            break;
        case "unsubscribe":
            break;
        case "current":
            break;
        case "soft":
        case "computer":
            // await handleBoardSelection(bot, chatId, action);
            break;
        case "back_to_organization":
            await bot.editMessageText(Message_1.PROMPT.SUBSCRIBE, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: (0, keyboard_util_1.createOrganizationKeyboard)()
                    .reply_markup,
            });
            break;
        default:
            break;
    }
}
exports.handleCallbackQuery = handleCallbackQuery;
// async function handleBoardSelection(
//   bot: TelegramBot,
//   chatId: string,
//   board: string,
// ): Promise<void> {
//   const subscriber = await getSubscriber(chatId);
//   const boardDisplayName: string = CALLBACK_TEXT_MAP[board] || board;
//
//   if (subscriber) {
//     if (subscriber.subscribedBoards.includes(board)) {
//       await bot.sendMessage(chatId, Messages.ALREADY_SUBSCRIBED);
//     } else {
//       subscriber.subscribedBoards.push(board);
//       await updateSubscriber(chatId, subscriber.subscribedBoards);
//       await bot.sendMessage(
//         chatId,
//         Messages.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
//       );
//     }
//   } else {
//     await updateSubscriber(chatId, [board]);
//     await bot.sendMessage(
//       chatId,
//       Messages.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
//     );
//   }
// }
//
// async function handleUnsubscribe(
//   bot: TelegramBot,
//   chatId: string,
//   messageId: number,
// ): Promise<void> {
//   const subscriber = await getSubscriber(chatId);
//   if (subscriber && subscriber.subscribedBoards.length > 0) {
//     const buttons = subscriber.subscribedBoards.map(board => ({
//       text: boardName(board),
//       callback_data: `unsubscribe_${board}`,
//     }));
//     await bot.editMessageText(Message.UNSUBSCRIBE_PROMPT, {
//       chat_id: chatId,
//       message_id: messageId,
//       reply_markup: {
//         inline_keyboard: [buttons],
//       } as TelegramBot.InlineKeyboardMarkup,
//     });
//   } else {
//     await bot.sendMessage(chatId, Message.NO_SUBSCRIPTIONS);
//   }
// }
//
// async function handleBoardUnsubscription(
//   bot: TelegramBot,
//   chatId: string,
//   messageId: number,
//   board: string,
// ): Promise<void> {
//   await removeSubscription(chatId, board);
//   await bot.sendMessage(
//     chatId,
//     Message.SUBSCRIPTION_REMOVED.replace("{board}", boardName(board)),
//   );
// }
//# sourceMappingURL=callback-handler.js.map