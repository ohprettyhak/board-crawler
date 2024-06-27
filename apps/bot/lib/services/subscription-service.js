"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCurrentSubscription = exports.handleUnsubscribe = exports.handleBoardSelection = void 0;
const messages_1 = require("../constants/messages");
const subscriber_utils_1 = require("../utils/subscriber-utils");
const keyboards_1 = require("../constants/keyboards");
async function handleBoardSelection(bot, chatId, board) {
    const subscriber = await (0, subscriber_utils_1.getSubscriber)(chatId);
    const boardDisplayName = keyboards_1.CALLBACK_TEXT_MAP[board] || board;
    if (subscriber) {
        if (subscriber.subscribedBoards.includes(board)) {
            await bot.sendMessage(chatId, messages_1.PROMPT.ALREADY_SUBSCRIBED);
        }
        else {
            subscriber.subscribedBoards.push(board);
            await (0, subscriber_utils_1.updateSubscriber)(chatId, subscriber.subscribedBoards);
            await bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName));
        }
    }
    else {
        await (0, subscriber_utils_1.updateSubscriber)(chatId, [board]);
        await bot.sendMessage(chatId, messages_1.PROMPT.SUBSCRIPTION_ADDED.replace("{board}", boardDisplayName));
    }
}
exports.handleBoardSelection = handleBoardSelection;
async function handleUnsubscribe(bot, chatId) {
    const subscriber = await (0, subscriber_utils_1.getSubscriber)(chatId);
    if (subscriber) {
        subscriber.subscribedBoards = [];
        await (0, subscriber_utils_1.updateSubscriber)(chatId, subscriber.subscribedBoards);
        await bot.sendMessage(chatId, messages_1.PROMPT.UNSUBSCRIBED);
    }
    else {
        await bot.sendMessage(chatId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
    }
}
exports.handleUnsubscribe = handleUnsubscribe;
async function handleCurrentSubscription(bot, chatId) {
    const subscriber = await (0, subscriber_utils_1.getSubscriber)(chatId);
    if (subscriber && subscriber.subscribedBoards.length > 0) {
        await bot.sendMessage(chatId, messages_1.PROMPT.CURRENT_SUBSCRIPTIONS.replace("{boards}", subscriber.subscribedBoards.join(", ")));
    }
    else {
        await bot.sendMessage(chatId, messages_1.PROMPT.NO_SUBSCRIPTIONS);
    }
}
exports.handleCurrentSubscription = handleCurrentSubscription;
//# sourceMappingURL=subscription-service.js.map