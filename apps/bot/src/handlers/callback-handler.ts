import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/Message";
import {
  createHUFSBoardKeyboard,
  createOrganizationKeyboard,
} from "@/utils/keyboard-util";

export async function handleCallbackQuery(
  bot: TelegramBot,
  query: TelegramBot.CallbackQuery,
): Promise<void> {
  const chatId: string | undefined = query.message?.chat.id.toString();
  const messageId: number | undefined = query.message?.message_id;
  const action: string | undefined = query.data;

  if (!chatId || !action || !messageId) return;

  switch (action) {
    case "hufs":
      await bot.editMessageText(PROMPT.SUBSCRIBE, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: createHUFSBoardKeyboard()
          .reply_markup as TelegramBot.InlineKeyboardMarkup,
      });
      break;

    case "unsubscribe":
      // TODO: Implement unsubscribe functionality
      break;

    case "current":
      // TODO: Implement current subscription functionality
      break;

    case "soft":
    case "computer":
      // TODO: Uncomment and implement handleBoardSelection
      // await handleBoardSelection(bot, chatId, action);
      break;

    case "back_to_organization":
      await bot.editMessageText(PROMPT.BOARD_SELECTION, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: createOrganizationKeyboard()
          .reply_markup as TelegramBot.InlineKeyboardMarkup,
      });
      break;

    default:
      break;
  }
}


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
