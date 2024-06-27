import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";

export async function startCommand(
  bot: TelegramBot,
  msg: TelegramBot.Message,
): Promise<void> {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, PROMPT.START);
}
