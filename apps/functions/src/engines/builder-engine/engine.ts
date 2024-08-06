import { Service } from 'typedi';

import { Engine } from '@/engines/engine-interface';
import { ArticleCrawlType } from '@/entities/article';
import { Board } from '@/entities/board';
import FetchQueueRepository from '@/repositories/fetch-queue-repository';

import { fetchArticleContent, fetchBoardUrls } from './helper';

@Service()
export class BuilderEngine implements Engine {
  constructor(private fetchQueueRepository: FetchQueueRepository) {}

  async fetchArticleUrls(board: Board): Promise<string[]> {
    const newlyFetchedUrls: string[] = await fetchBoardUrls(board.url);

    const uniqueNewUrls: Set<string> = new Set(newlyFetchedUrls);

    const existingQueues = await this.fetchQueueRepository.findTopFetchQueuesByBoardId(
      board.id,
      30,
    );
    const existingUrls: Set<string> = new Set(existingQueues.map(queue => queue.url));

    return Array.from(uniqueNewUrls).filter(newUrl => {
      return !Array.from(existingUrls).some(existingUrl => existingUrl.includes(newUrl));
    });
  }

  async fetchArticleContent(url: string): Promise<ArticleCrawlType> {
    return await fetchArticleContent(url);
  }
}
