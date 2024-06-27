import TelegramService from "@/services/telegram-service";
import { token } from "@/configs/telegram-bot-token.json";

const telegramService: TelegramService = new TelegramService(token);
telegramService.start();
