import TelegramBot from 'node-telegram-bot-api';

import { organizationBoards } from '@/constants/keyboards';
import { PROMPT } from '@/constants/messages';
import SubscriberService from '@/services/subscriber-service';
import { EditMessageFunction } from '@/services/telegram-service';
import {
  createHUFSBoardKeyboard,
  createOrganizationKeyboard,
  createRemoveSubscriptionKeyboard,
} from '@/utils/keyboard-utils';

class CallbackController {
  private readonly bot: TelegramBot;
  private readonly editMessage: EditMessageFunction;
  private readonly subscriberService: SubscriberService;
  private readonly organizationKeyboards: Record<string, () => TelegramBot.SendMessageOptions>;

  constructor(bot: TelegramBot, editMessage: EditMessageFunction) {
    this.bot = bot;
    this.editMessage = editMessage;
    this.subscriberService = new SubscriberService();
    this.organizationKeyboards = {
      hufs: createHUFSBoardKeyboard,
    };
  }

  public async handleCallbackQuery(query: TelegramBot.CallbackQuery): Promise<void> {
    const chatId = query.message?.chat.id.toString();
    const messageId = query.message?.message_id;
    const action = query.data;

    if (!chatId || !action || !messageId) return;

    if (this.organizationKeyboards[action]) {
      await this.handleOrganization(chatId, messageId, action);
    } else {
      await this.handleDefaultAction(chatId, messageId, action);
    }
  }

  private async handleOrganization(chatId: string, messageId: number, organization: string) {
    const text =
      `${organizationBoards[organization].text}를 선택했어요!\n\n` + PROMPT.BOARD_SELECTION;
    const replyMarkup = this.organizationKeyboards[organization]()
      .reply_markup as TelegramBot.InlineKeyboardMarkup;

    await this.editMessage(chatId, messageId, text, replyMarkup);
  }

  private async handleDefaultAction(chatId: string, messageId: number, action: string) {
    switch (action) {
      case organizationBoards.hufs_soft.callback_data:
      case organizationBoards.hufs_computer.callback_data:
        await this.bot.sendMessage(
          chatId,
          await this.subscriberService.selectBoard(chatId, action),
        );
        break;

      case organizationBoards.back_to_organization.callback_data:
        await this.editMessage(
          chatId,
          messageId,
          PROMPT.SUBSCRIBE,
          createOrganizationKeyboard().reply_markup as TelegramBot.InlineKeyboardMarkup,
        );
        break;

      default:
        if (action.startsWith('unsubscribe_')) {
          const board: string = action.replace('unsubscribe_', '');
          const response: string = await this.subscriberService.removeSubscription(chatId, board);
          await this.bot.sendMessage(chatId, response);

          const keyboard = await createRemoveSubscriptionKeyboard(chatId);
          if (keyboard) {
            await this.editMessage(
              chatId,
              messageId,
              PROMPT.BOARD_UNSUBSCRIBE_SELECTION,
              keyboard.reply_markup as TelegramBot.InlineKeyboardMarkup,
            );
          } else {
            await this.editMessage(chatId, messageId, PROMPT.NO_SUBSCRIPTIONS);
          }
        }
        break;
    }
  }
}

export default CallbackController;
