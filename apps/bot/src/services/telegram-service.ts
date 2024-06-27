import TelegramBot from "node-telegram-bot-api";
import { startCommand } from "@/controllers/start-controller";
import { callbackQuery } from "@/controllers/callback-controller";
import { subscribeCommand } from "@/controllers/subscribe-controller";

class TelegramService {
  private readonly bot: TelegramBot;

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public start(): void {
    this.bot.onText(/\/start/, this.startCommand.bind(this));
    this.bot.onText(/\/subscribe/, this.subscribeCommand.bind(this));
    this.bot.on("callback_query", this.callbackQuery.bind(this));
  }

  private startCommand(msg: TelegramBot.Message): void {
    startCommand(this.bot, msg).catch(err => console.error(err));
  }

  private subscribeCommand(msg: TelegramBot.Message): void {
    subscribeCommand(this.bot, msg).catch(err => console.error(err));
  }

  private async callbackQuery(query: TelegramBot.CallbackQuery): Promise<void> {
    await callbackQuery(this.bot, query);
  }
}

export default TelegramService;
