import TelegramBot from "node-telegram-bot-api";
import { handleBoardSelection } from "@/services/subscription-service";
import {
  createHUFSBoardKeyboard,
  createOrganizationKeyboard,
} from "@/utils/keyboard-utils";
import { PROMPT } from "@/constants/messages";

export async function callbackQuery(
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

    case "soft":
    case "computer":
      await handleBoardSelection(bot, chatId, action);
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
