import 'reflect-metadata';

import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import FetchController from '@/controllers/fetch-controller';
import { Article } from '@/entities/article';
import { FetchQueue } from '@/entities/fetch-queue';
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

exports.onCrawlFetchQueue = onDocumentCreated(
  {
    document: 'fetch_queues/{id}',
    region: 'asia-northeast3',
  },
  async event => {
    const snapshot: QueryDocumentSnapshot | undefined = event.data;
    if (!snapshot) return;

    const data: FetchQueue = snapshot.data() as FetchQueue;

    const crawlService: FetchService = Container.get(FetchService);
    await crawlService.crawlArticleContent(data);

    return;
  },
);

exports.onNotifyArticle = onDocumentCreated(
  {
    document: 'organizations/{organizationsId}/boards/{boardsId}/articles/{articlesId}',
    region: 'asia-northeast3',
  },
  async event => {
    const snapshot: QueryDocumentSnapshot | undefined = event.data;
    if (!snapshot) return;

    const data: Article = snapshot.data() as Article;
    console.log(JSON.stringify(data));

    return;
  },
);
