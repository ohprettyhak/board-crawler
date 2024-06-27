import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";

class UnsubscribeController {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async handleUnsubscribeCommand(
    msg: TelegramBot.Message,
  ): Promise<void> {
    const chatId = msg.chat.id.toString();
    await this.bot.sendMessage(chatId, PROMPT.UNSUBSCRIBED);
  }
}

export default UnsubscribeController;
