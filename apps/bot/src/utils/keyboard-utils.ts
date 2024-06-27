import TelegramBot from "node-telegram-bot-api";

import { organizationBoards } from "@/constants/keyboards";
import { Subscriber } from "@/models/subscriber";
import { findById } from "@/utils/subscriber-utils";

const createInlineKeyboard = (
  buttonKeys: string[],
  prefix: string = "",
): TelegramBot.SendMessageOptions => ({
  reply_markup: {
    inline_keyboard: buttonKeys.map(key => [
      {
        text: organizationBoards[key].text,
        callback_data: `${prefix}${organizationBoards[key].callback_data}`,
      },
    ]),
  },
});

export const createOrganizationKeyboard =
  (): TelegramBot.SendMessageOptions => {
    const buttonKeys = [organizationBoards.hufs.callback_data];
    return createInlineKeyboard(buttonKeys);
  };

export const createHUFSBoardKeyboard = (): TelegramBot.SendMessageOptions => {
  const buttonKeys: string[] = [
    organizationBoards.hufs_soft.callback_data,
    organizationBoards.hufs_computer.callback_data,
    organizationBoards.back_to_organization.callback_data,
  ];
  return createInlineKeyboard(buttonKeys);
};

export const createRemoveSubscriptionKeyboard = async (
  chatId: string,
): Promise<TelegramBot.SendMessageOptions | null> => {
  const subscriber: Subscriber | null = await findById(chatId);

  if (subscriber && subscriber.subscribedBoards.length > 0) {
    const buttonKeys = subscriber.subscribedBoards;
    return createInlineKeyboard(buttonKeys, "unsubscribe_");
  } else {
    return null;
  }
};
