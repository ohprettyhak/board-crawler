import TelegramService from "@/libs/TelegramService";

const telegramService: TelegramService = new TelegramService();

const startPolling = (): void => {
  telegramService.bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    console.log(`Received message from chat ID ${chatId}: ${text}`);

    telegramService.bot
      .sendMessage(chatId, `You said: ${text}`)
      .then(() => {
        console.log(`Message sent to chat ID ${chatId}: You said: ${text}`);
      })
      .catch((error) => {
        console.error(`Failed to send message to chat ID ${chatId}:`, error);
      });
  });
};

startPolling();
