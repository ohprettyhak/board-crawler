import TelegramBot from 'node-telegram-bot-api';

import { PROMPT } from '@/constants/messages';

class StartController {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    await this.bot.sendMessage(chatId, PROMPT.START);
  }
}

export default StartController;
