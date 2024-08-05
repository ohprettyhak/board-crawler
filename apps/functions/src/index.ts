import 'reflect-metadata';

import { onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import FetchController from '@/controllers/fetch-controller';
import FetchService from '@/services/fetch-service';

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
  async () => {
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
  async () => {
    // const crawlService: FetchService = Container.get(FetchService);
    // await crawlService.crawlArticleContent(data);

    return;
  },
);

exports.onNotifyArticle = onSchedule(
  {
    schedule: 'every 10 minutes',
    timeZone: 'Asia/Seoul',
    region: 'asia-northeast3',
  },
  async () => {
    // console.log('notify');

    return;
  },
);
