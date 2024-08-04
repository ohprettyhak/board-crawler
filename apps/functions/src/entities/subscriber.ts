export const PLATFORMS = ['telegram', 'discord'] as const;

export interface Subscriber {
  chatId: string;
  subscribedBoards: string[];
  platform: typeof PLATFORMS;
}
