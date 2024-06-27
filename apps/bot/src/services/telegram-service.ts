import TelegramBot from "node-telegram-bot-api";
import { token } from "@/configs/telegram-bot-token.json";
import { handleStartCommand } from "@/handlers/start-handler";
import { handleCallbackQuery } from "@/handlers/callback-handler";
import { handleSubscribeCommand } from "@/handlers/subscribe-handler";

class TelegramService {
  private readonly bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public start(): void {
    this.bot.onText(/\/start/, this.handleStartCommand.bind(this));
    this.bot.onText(/\/subscribe/, this.handleSubscribeCommand.bind(this));
    this.bot.on("callback_query", this.handleCallbackQuery.bind(this));
  }

  private handleStartCommand(msg: TelegramBot.Message): void {
    handleStartCommand(this.bot, msg).catch(err => console.error(err));
  }

  private handleSubscribeCommand(msg: TelegramBot.Message): void {
    handleSubscribeCommand(this.bot, msg).catch(err => console.error(err));
  }

  private async handleCallbackQuery(
    query: TelegramBot.CallbackQuery,
  ): Promise<void> {
    await handleCallbackQuery(this.bot, query);
  }
}

export default TelegramService;
