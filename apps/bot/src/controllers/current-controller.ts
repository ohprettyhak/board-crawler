import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";

class CurrentController {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async handleCurrentCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id.toString();
    await this.bot.sendMessage(chatId, PROMPT.CURRENT_SUBSCRIPTIONS);
  }
}

export default CurrentController;
