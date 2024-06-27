import TelegramBot from "node-telegram-bot-api";

import { PROMPT } from "@/constants/messages";
import { createOrganizationKeyboard } from "@/utils/keyboard-utils";

class SubscribeController {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async handleSubscribeCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id.toString();
    await this.bot.sendMessage(
      chatId,
      PROMPT.SUBSCRIBE,
      createOrganizationKeyboard(),
    );
  }
}

export default SubscribeController;
