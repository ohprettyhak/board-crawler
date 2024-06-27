"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constants/messages");
const keyboards_1 = require("../constants/keyboards");
const subscriber_utils_1 = require("../utils/subscriber-utils");
class SubscriberService {
    constructor(bot) {
        this.bot = bot;
    }
    async selectBoard(chatId, board) {
        var _a;
        const subscriber = await (0, subscriber_utils_1.findById)(chatId);
        const boardDisplayName = ((_a = keyboards_1.organizationBoards[board]) === null || _a === void 0 ? void 0 : _a.text) || board;
        if (subscriber) {
            if (subscriber.subscribedBoards.includes(board)) {
                await this.bot.sendMessage(chatId, messages_1.PROMPT.ALREADY_SUBSCRIBED);
            }
            else {
                subscriber.subscribedBoards.push(board);
                await (0, subscriber_utils_1.save)(subscriber);
                await this.bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName));
            }
        }
        else {
            await (0, subscriber_utils_1.save)({ chatId, subscribedBoards: [board] });
            await this.bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName));
        }
    }
    async removeSubscriptions(chatId) {
        const subscriber = await (0, subscriber_utils_1.findById)(chatId);
        if (subscriber) {
            subscriber.subscribedBoards = [];
            await (0, subscriber_utils_1.save)(subscriber);
            await this.bot.sendMessage(chatId, messages_1.PROMPT.UNSUBSCRIBED);
        }
        else {
            await this.bot.sendMessage(chatId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
        }
    }
    async getCurrentSubscriptions(chatId) {
        const subscriber = await (0, subscriber_utils_1.findById)(chatId);
        if (subscriber && subscriber.subscribedBoards.length > 0) {
            const boardNames = subscriber.subscribedBoards
                .map(board => { var _a; return ((_a = keyboards_1.organizationBoards[board]) === null || _a === void 0 ? void 0 : _a.text) || board; })
                .join(", ");
            await this.bot.sendMessage(chatId, messages_1.PROMPT.CURRENT_SUBSCRIPTIONS.replace("{boards}", boardNames));
        }
        else {
            await this.bot.sendMessage(chatId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
        }
    }
}
exports.default = SubscriberService;
//# sourceMappingURL=subscriber-service.js.map