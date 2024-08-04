import { token } from '@/configs/telegram-bot-token.json';
import TelegramService from '@/services/telegram-service';

const telegramService: TelegramService = new TelegramService(token);
telegramService.start();
