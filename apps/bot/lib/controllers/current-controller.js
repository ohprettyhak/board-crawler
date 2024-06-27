"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscriber_service_1 = __importDefault(require("../services/subscriber-service"));
class CurrentController {
    constructor(bot) {
        this.bot = bot;
        this.subscriberService = new subscriber_service_1.default();
    }
    async handleCurrentCommand(msg) {
        const chatId = msg.chat.id.toString();
        await this.bot.sendMessage(chatId, await this.subscriberService.getCurrentSubscriptions(chatId));
    }
}
exports.default = CurrentController;
//# sourceMappingURL=current-controller.js.map