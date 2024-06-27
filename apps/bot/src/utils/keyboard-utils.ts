import TelegramBot from "node-telegram-bot-api";
import { CALLBACK_DATA, CALLBACK_TEXT_MAP } from "@/constants/keyboards";

const createInlineKeyboard = (
  buttonKeys: string[],
): TelegramBot.SendMessageOptions => ({
  reply_markup: {
    inline_keyboard: buttonKeys.map(callbackData => [
      {
        text: CALLBACK_TEXT_MAP[callbackData] || callbackData,
        callback_data: callbackData,
      },
    ]),
  },
});

export const createOrganizationKeyboard =
  (): TelegramBot.SendMessageOptions => {
    const buttonKeys = [CALLBACK_DATA.HUFS];
    return createInlineKeyboard(buttonKeys);
  };

export const createHUFSBoardKeyboard = (): TelegramBot.SendMessageOptions => {
  const buttonKeys = [
    CALLBACK_DATA.AI_SCHOOL,
    CALLBACK_DATA.COMPUTER_SCIENCE,
    CALLBACK_DATA.BACK_TO_ORGANIZATION,
  ];
  return createInlineKeyboard(buttonKeys);
};
