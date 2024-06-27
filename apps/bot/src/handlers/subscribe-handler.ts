import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/Message";
import { createOrganizationKeyboard } from "@/utils/keyboard-util";

export async function handleSubscribeCommand(
  bot: TelegramBot,
  msg: TelegramBot.Message,
): Promise<void> {
  const chatId = msg.chat.id.toString();
  await bot.sendMessage(chatId, PROMPT.SUBSCRIBE, createOrganizationKeyboard());
}
