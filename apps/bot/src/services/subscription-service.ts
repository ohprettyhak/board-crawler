import TelegramBot from "node-telegram-bot-api";
import { PROMPT } from "@/constants/messages";
import { getSubscriber, updateSubscriber } from "@/utils/subscriber-utils";
import { CALLBACK_TEXT_MAP } from "@/constants/keyboards";

export async function handleBoardSelection(
  bot: TelegramBot,
  chatId: string,
  board: string,
): Promise<void> {
  const subscriber = await getSubscriber(chatId);
  const boardDisplayName: string = CALLBACK_TEXT_MAP[board] || board;

  if (subscriber) {
    if (subscriber.subscribedBoards.includes(board)) {
      await bot.sendMessage(chatId, PROMPT.ALREADY_SUBSCRIBED);
    } else {
      subscriber.subscribedBoards.push(board);
      await updateSubscriber(chatId, subscriber.subscribedBoards);
      await bot.sendMessage(
        chatId,
        PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
      );
    }
  } else {
    await updateSubscriber(chatId, [board]);
    await bot.sendMessage(
      chatId,
      PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName),
    );
  }
}

export async function handleUnsubscribe(
  bot: TelegramBot,
  chatId: string,
): Promise<void> {
  const subscriber = await getSubscriber(chatId);

  if (subscriber) {
    subscriber.subscribedBoards = [];
    await updateSubscriber(chatId, subscriber.subscribedBoards);
    await bot.sendMessage(chatId, PROMPT.UNSUBSCRIBED);
  } else {
    await bot.sendMessage(chatId, PROMPT.NO_SUBSCRIPTIONS);
  }
}

export async function handleCurrentSubscription(
  bot: TelegramBot,
  chatId: string,
): Promise<void> {
  const subscriber = await getSubscriber(chatId);

  if (subscriber && subscriber.subscribedBoards.length > 0) {
    await bot.sendMessage(
      chatId,
      PROMPT.CURRENT_SUBSCRIPTIONS.replace(
        "{boards}",
        subscriber.subscribedBoards.join(", "),
      ),
    );
  } else {
    await bot.sendMessage(chatId, PROMPT.NO_SUBSCRIPTIONS);
  }
}
