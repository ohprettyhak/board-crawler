import TelegramBot from "node-telegram-bot-api";
import {
  createHUFSBoardKeyboard,
  createOrganizationKeyboard,
} from "@/utils/keyboard-utils";
import { PROMPT } from "@/constants/messages";
import { EditMessageFunction } from "@/services/telegram-service";
import { organizationBoards } from "@/constants/keyboards";
import SubscriberService from "@/services/subscriber-service";

class CallbackController {
  private readonly editMessage: EditMessageFunction;
  private readonly subscriberService: SubscriberService;
  private readonly organizationKeyboards: Record<
    string,
    () => TelegramBot.SendMessageOptions
  >;

  constructor(bot: TelegramBot, editMessage: EditMessageFunction) {
    this.editMessage = editMessage;
    this.subscriberService = new SubscriberService(bot);
    this.organizationKeyboards = {
      hufs: createHUFSBoardKeyboard,
    };
  }

  public async handleCallbackQuery(
    query: TelegramBot.CallbackQuery,
  ): Promise<void> {
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

  private async handleOrganization(
    chatId: string,
    messageId: number,
    organization: string,
  ) {
    const text =
      `${organizationBoards[organization].text}를 선택했어요!\n\n` +
      PROMPT.BOARD_SELECTION;
    const replyMarkup = this.organizationKeyboards[organization]()
      .reply_markup as TelegramBot.InlineKeyboardMarkup;

    await this.editMessage(chatId, messageId, text, replyMarkup);
  }

  private async handleDefaultAction(
    chatId: string,
    messageId: number,
    action: string,
  ) {
    switch (action) {
      case organizationBoards.hufs_soft.callback_data:
      case organizationBoards.hufs_computer.callback_data:
        await this.subscriberService.selectBoard(chatId, action);
        break;

      case organizationBoards.back_to_organization.callback_data:
        await this.editMessage(
          chatId,
          messageId,
          PROMPT.SUBSCRIBE,
          createOrganizationKeyboard()
            .reply_markup as TelegramBot.InlineKeyboardMarkup,
        );
        break;

      default:
        break;
    }
  }
}

export default CallbackController;
