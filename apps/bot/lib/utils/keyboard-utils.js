"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRemoveSubscriptionKeyboard = exports.createHUFSBoardKeyboard = exports.createOrganizationKeyboard = void 0;
const keyboards_1 = require("../constants/keyboards");
const subscriber_utils_1 = require("../utils/subscriber-utils");
const createInlineKeyboard = (buttonKeys, prefix = "") => ({
    reply_markup: {
        inline_keyboard: buttonKeys.map(key => [
            {
                text: keyboards_1.organizationBoards[key].text,
                callback_data: `${prefix}${keyboards_1.organizationBoards[key].callback_data}`,
            },
        ]),
    },
});
const createOrganizationKeyboard = () => {
    const buttonKeys = [keyboards_1.organizationBoards.hufs.callback_data];
    return createInlineKeyboard(buttonKeys);
};
exports.createOrganizationKeyboard = createOrganizationKeyboard;
const createHUFSBoardKeyboard = () => {
    const buttonKeys = [
        keyboards_1.organizationBoards.hufs_soft.callback_data,
        keyboards_1.organizationBoards.hufs_computer.callback_data,
        keyboards_1.organizationBoards.back_to_organization.callback_data,
    ];
    return createInlineKeyboard(buttonKeys);
};
exports.createHUFSBoardKeyboard = createHUFSBoardKeyboard;
const createRemoveSubscriptionKeyboard = async (chatId) => {
    const subscriber = await (0, subscriber_utils_1.findById)(chatId);
    if (subscriber && subscriber.subscribedBoards.length > 0) {
        const buttonKeys = subscriber.subscribedBoards;
        return createInlineKeyboard(buttonKeys, "unsubscribe_");
    }
    else {
        return null;
    }
};
exports.createRemoveSubscriptionKeyboard = createRemoveSubscriptionKeyboard;
//# sourceMappingURL=keyboard-utils.js.map