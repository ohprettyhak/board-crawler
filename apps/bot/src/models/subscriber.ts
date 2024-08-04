export interface Subscriber {
  chatId: string;
  subscribedBoards: string[];
  platform: 'telegram' | 'discord';
}
