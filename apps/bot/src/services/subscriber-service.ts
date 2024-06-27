import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";
import { Subscriber } from "@/models/subscriber";
import { organizationBoards } from "@/constants/keyboards";
import { findById, save } from "@/utils/subscriber-utils";

class SubscriberService {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public async selectBoard(chatId: string, board: string): Promise<void> {
    const subscriber: Subscriber | null = await findById(chatId);
    const boardDisplayName: string = organizationBoards[board]?.text || board;

    if (subscriber) {
      if (subscriber.subscribedBoards.includes(board)) {
        await this.bot.sendMessage(chatId, PROMPT.ALREADY_SUBSCRIBED);
      } else {
        subscriber.subscribedBoards.push(board);
        await save(subscriber);
        await this.bot.sendMessage(
          chatId,
          PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
        );
      }
    } else {
      await save({ chatId, subscribedBoards: [board] });
      await this.bot.sendMessage(
        chatId,
        PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
      );
    }
  }

  public async removeSubscriptions(chatId: string): Promise<void> {
    const subscriber = await findById(chatId);

    if (subscriber) {
      subscriber.subscribedBoards = [];
      await save(subscriber);
      await this.bot.sendMessage(chatId, PROMPT.UNSUBSCRIBED);
    } else {
      await this.bot.sendMessage(chatId, PROMPT.NO_SUBSCRIPTIONS);
    }
  }

  public async getCurrentSubscriptions(chatId: string): Promise<void> {
    const subscriber = await findById(chatId);

    if (subscriber && subscriber.subscribedBoards.length > 0) {
      const boardNames = subscriber.subscribedBoards
        .map(board => organizationBoards[board]?.text || board)
        .join(", ");
      await this.bot.sendMessage(
        chatId,
        PROMPT.CURRENT_SUBSCRIPTIONS.replace("{boards}", boardNames),
      );
    } else {
      await this.bot.sendMessage(chatId, PROMPT.NO_SUBSCRIPTIONS);
    }
  }
}

export default SubscriberService;
