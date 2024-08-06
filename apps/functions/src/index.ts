import 'reflect-metadata';

import { onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import FetchController from '@/controllers/fetch-controller';
import { Article } from '@/entities/article';
import FetchService from '@/services/fetch-service';
import { sleep } from '@/utils/date-utils';

useContainer(Container);

const app = createExpressServer({
  controllers: [FetchController],
  defaultErrorHandler: false,
});

exports.api = onRequest({ region: ['asia-northeast3'] }, app);

exports.onCrawlBoards = onSchedule(
  {
    schedule: 'every 30 minutes',
    timeZone: 'Asia/Seoul',
    region: 'asia-northeast3',
  },
  async (): Promise<void> => {
    const crawlService: FetchService = Container.get(FetchService);
    await crawlService.crawlAndQueueAllBoards();
  },
);

exports.onCrawlFetchQueue = onSchedule(
  {
    schedule: 'every 10 minutes',
    timeZone: 'Asia/Seoul',
    region: 'asia-northeast3',
  },
  async (): Promise<void> => {
    const crawlService: FetchService = Container.get(FetchService);

    for (let attempt: number = 0; attempt < 5; attempt++) {
      const articles: Article[] = await crawlService.crawlArticleContent();
      if (articles.length === 0) break;
      await sleep(2000);
    }

    return;
  },
);

exports.onNotifyArticle = onSchedule(
  {
    schedule: 'every 10 minutes',
    timeZone: 'Asia/Seoul',
    region: 'asia-northeast3',
  },
  async (): Promise<void> => {
    // console.log('notify');

    return;
  },
);
