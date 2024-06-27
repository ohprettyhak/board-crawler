import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/Message";

export async function handleStartCommand(
  bot: TelegramBot,
  msg: TelegramBot.Message,
): Promise<void> {
  const chatId = msg.chat.id.toString();
  await bot.sendMessage(chatId, PROMPT.WELCOME);
}
