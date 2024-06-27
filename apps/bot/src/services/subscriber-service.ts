import { PROMPT } from "@/constants/messages";
import { Subscriber } from "@/models/subscriber";
import { organizationBoards } from "@/constants/keyboards";
import { findById, save } from "@/utils/subscriber-utils";

class SubscriberService {
  public async selectBoard(chatId: string, board: string): Promise<string> {
    const subscriber: Subscriber | null = await findById(chatId);
    const boardDisplayName: string = organizationBoards[board]?.text || board;

    if (subscriber) {
      if (subscriber.subscribedBoards.includes(board)) {
        return PROMPT.ALREADY_SUBSCRIBED.replace("{board}", boardDisplayName);
      } else {
        subscriber.subscribedBoards.push(board);
        await save(subscriber);
        return PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName);
      }
    } else {
      await save({ chatId, subscribedBoards: [board] });
      return PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName);
    }
  }

  public async removeSubscriptions(chatId: string): Promise<string> {
    const subscriber = await findById(chatId);

    if (subscriber) {
      subscriber.subscribedBoards = [];
      await save(subscriber);
      return PROMPT.UNSUBSCRIBED;
    } else {
      return PROMPT.NO_SUBSCRIPTIONS;
    }
  }

  public async getCurrentSubscriptions(chatId: string): Promise<string> {
    const subscriber = await findById(chatId);

    if (subscriber && subscriber.subscribedBoards.length > 0) {
      const boardNames = subscriber.subscribedBoards
        .map(board => organizationBoards[board]?.text || board)
        .join(", ");
      return PROMPT.CURRENT_SUBSCRIPTIONS.replace("{boards}", boardNames);
    } else {
      return PROMPT.NO_SUBSCRIPTIONS;
    }
  }
}

export default SubscriberService;