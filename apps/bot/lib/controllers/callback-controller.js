"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscriber_service_1 = __importDefault(require("../services/subscriber-service"));
const keyboard_utils_1 = require("../utils/keyboard-utils");
const keyboards_1 = require("../constants/keyboards");
const messages_1 = require("../constants/messages");
class CallbackController {
    constructor(bot, editMessage) {
        this.bot = bot;
        this.editMessage = editMessage;
        this.subscriberService = new subscriber_service_1.default();
        this.organizationKeyboards = {
            hufs: keyboard_utils_1.createHUFSBoardKeyboard,
        };
    }
    async handleCallbackQuery(query) {
        var _a, _b;
        const chatId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.chat.id.toString();
        const messageId = (_b = query.message) === null || _b === void 0 ? void 0 : _b.message_id;
        const action = query.data;
        if (!chatId || !action || !messageId)
            return;
        if (this.organizationKeyboards[action]) {
            await this.handleOrganization(chatId, messageId, action);
        }
        else {
            await this.handleDefaultAction(chatId, messageId, action);
        }
    }
    async handleOrganization(chatId, messageId, organization) {
        const text = `${keyboards_1.organizationBoards[organization].text}를 선택했어요!\n\n` +
            messages_1.PROMPT.BOARD_SELECTION;
        const replyMarkup = this.organizationKeyboards[organization]()
            .reply_markup;
        await this.editMessage(chatId, messageId, text, replyMarkup);
    }
    async handleDefaultAction(chatId, messageId, action) {
        switch (action) {
            case keyboards_1.organizationBoards.hufs_soft.callback_data:
            case keyboards_1.organizationBoards.hufs_computer.callback_data:
                await this.bot.sendMessage(chatId, await this.subscriberService.selectBoard(chatId, action));
                break;
            case keyboards_1.organizationBoards.back_to_organization.callback_data:
                await this.editMessage(chatId, messageId, messages_1.PROMPT.SUBSCRIBE, (0, keyboard_utils_1.createOrganizationKeyboard)()
                    .reply_markup);
                break;
            default:
                if (action.startsWith("unsubscribe_")) {
                    const board = action.replace("unsubscribe_", "");
                    const response = await this.subscriberService.removeSubscription(chatId, board);
                    await this.bot.sendMessage(chatId, response);
                    const keyboard = await (0, keyboard_utils_1.createRemoveSubscriptionKeyboard)(chatId);
                    if (keyboard) {
                        await this.editMessage(chatId, messageId, messages_1.PROMPT.BOARD_UNSUBSCRIBE_SELECTION, keyboard.reply_markup);
                    }
                    else {
                        await this.editMessage(chatId, messageId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
                    }
                }
                break;
        }
    }
}
exports.default = CallbackController;
//# sourceMappingURL=callback-controller.js.map