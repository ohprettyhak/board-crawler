import TelegramBot from "node-telegram-bot-api";
import { organizationBoards } from "@/constants/keyboards";

const createInlineKeyboard = (
  buttonKeys: string[],
): TelegramBot.SendMessageOptions => ({
  reply_markup: {
    inline_keyboard: buttonKeys.map(key => [
      {
        text: organizationBoards[key].text,
        callback_data: organizationBoards[key].callback_data,
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
