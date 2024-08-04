import TelegramBot from 'node-telegram-bot-api';

import SubscriberService from '@/services/subscriber-service';

class CurrentController {
  private readonly bot: TelegramBot;
  private readonly subscriberService: SubscriberService;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.subscriberService = new SubscriberService();
  }

  public async handleCurrentCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId: string = msg.chat.id.toString();
    await this.bot.sendMessage(
      chatId,
      await this.subscriberService.getCurrentSubscriptions(chatId),
    );
  }
}

export default CurrentController;
