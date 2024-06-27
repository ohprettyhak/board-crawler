"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHUFSBoardKeyboard = exports.createOrganizationKeyboard = void 0;
const keyboards_1 = require("../constants/keyboards");
const createInlineKeyboard = (buttonKeys) => ({
    reply_markup: {
        inline_keyboard: buttonKeys.map(callbackData => [
            {
                text: keyboards_1.CALLBACK_TEXT_MAP[callbackData] || callbackData,
                callback_data: callbackData,
            },
        ]),
    },
});
const createOrganizationKeyboard = () => {
    const buttonKeys = [keyboards_1.CALLBACK_DATA.HUFS];
    return createInlineKeyboard(buttonKeys);
};
exports.createOrganizationKeyboard = createOrganizationKeyboard;
const createHUFSBoardKeyboard = () => {
    const buttonKeys = [
        keyboards_1.CALLBACK_DATA.AI_SCHOOL,
        keyboards_1.CALLBACK_DATA.COMPUTER_SCIENCE,
        keyboards_1.CALLBACK_DATA.BACK_TO_ORGANIZATION,
    ];
    return createInlineKeyboard(buttonKeys);
};
exports.createHUFSBoardKeyboard = createHUFSBoardKeyboard;
//# sourceMappingURL=keyboard-utils.js.map