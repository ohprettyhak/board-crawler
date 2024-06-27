import TelegramBot from "node-telegram-bot-api";

import { PROMPT } from "@/constants/messages";
import { createRemoveSubscriptionKeyboard } from "@/utils/keyboard-utils";

class UnsubscribeController {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async handleUnsubscribeCommand(
    msg: TelegramBot.Message,
  ): Promise<void> {
    const chatId: string = msg.chat.id.toString();

    const subscribedList = await createRemoveSubscriptionKeyboard(chatId);
    if (subscribedList) {
      await this.bot.sendMessage(
        chatId,
        PROMPT.BOARD_UNSUBSCRIBE_SELECTION,
        subscribedList,
      );
    } else {
      await this.bot.sendMessage(chatId, PROMPT.NO_SUBSCRIPTIONS);
    }
  }
}

export default UnsubscribeController;
