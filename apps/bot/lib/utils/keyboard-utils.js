"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHUFSBoardKeyboard = exports.createOrganizationKeyboard = void 0;
const keyboards_1 = require("../constants/keyboards");
const createInlineKeyboard = (buttonKeys) => ({
    reply_markup: {
        inline_keyboard: buttonKeys.map(key => [
            {
                text: keyboards_1.organizationBoards[key].text,
                callback_data: keyboards_1.organizationBoards[key].callback_data,
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
//# sourceMappingURL=keyboard-utils.js.map