import TelegramBot from "node-telegram-bot-api";

import { COMMANDS } from "@/constants/messages";
import CallbackController from "@/controllers/callback-controller";
import CurrentController from "@/controllers/current-controller";
import StartController from "@/controllers/start-controller";
import SubscribeController from "@/controllers/subscribe-controller";
import UnsubscribeController from "@/controllers/unsubscribe-controller";

export type EditMessageFunction = (
  chatId: string,
  messageId: number,
  text: string,
  replyMarkup?: TelegramBot.InlineKeyboardMarkup,
) => Promise<void>;

class TelegramService {
  private readonly bot: TelegramBot;

  private readonly startController: StartController;
  private readonly subscribeController: SubscribeController;
  private readonly currentController: CurrentController;
  private readonly unsubscribeController: UnsubscribeController;
  private readonly callbackController: CallbackController;

  constructor(token: string) {
    this.bot = new TelegramBot(token, {
      polling: true,
      request: {
        agentOptions: {
          keepAlive: true,
          family: 4,
        },
      },
    } as TelegramBot.ConstructorOptions);
    this.startController = new StartController(this.bot);
    this.subscribeController = new SubscribeController(this.bot);
    this.currentController = new CurrentController(this.bot);
    this.unsubscribeController = new UnsubscribeController(this.bot);
    this.callbackController = new CallbackController(
      this.bot,
      this.editMessage,
    );
  }

  private readonly editMessage: EditMessageFunction = async (
    chatId,
    messageId,
    text,
    replyMarkup,
  ) => {
    const options: TelegramBot.EditMessageTextOptions = {
      chat_id: chatId,
      message_id: messageId,
      ...(replyMarkup && { reply_markup: replyMarkup }),
    };

    await this.bot.editMessageText(text, options);
  };

  public start(): void {
    const commands = {
      "/help": this.startController.handleStartCommand.bind(
        this.startController,
      ),
      "/start": this.startController.handleStartCommand.bind(
        this.startController,
      ),
      "/subscribe": this.subscribeController.handleSubscribeCommand.bind(
        this.subscribeController,
      ),
      "/unsubscribe": this.unsubscribeController.handleUnsubscribeCommand.bind(
        this.unsubscribeController,
      ),
      "/current": this.currentController.handleCurrentCommand.bind(
        this.currentController,
      ),
    };

    for (const [command, handler] of Object.entries(commands)) {
      this.bot.onText(new RegExp(command), msg => {
        handler(msg).catch(err => console.error(err));
      });
    }

    this.bot.on("callback_query", query => {
      this.callbackController
        .handleCallbackQuery(query)
        .catch(err => console.error(err));
    });

    this.bot.setMyCommands(COMMANDS).catch(err => console.error(err));
  }
}

export default TelegramService;
