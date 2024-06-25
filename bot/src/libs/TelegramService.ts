import TelegramBot from "node-telegram-bot-api";

import { token } from "@/configs/board-crawler-telegram-bot.json";

export default class TelegramService {
  public readonly bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(token, { polling: true });
  }
}
