import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";
import { createOrganizationKeyboard } from "@/utils/keyboard-utils";

export async function subscribeCommand(
  bot: TelegramBot,
  msg: TelegramBot.Message,
): Promise<void> {
  const chatId = msg.chat.id.toString();
  await bot.sendMessage(chatId, PROMPT.SUBSCRIBE, createOrganizationKeyboard());
}
