import "reflect-metadata";

import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

import CrawlController from "@/controllers/crawl-controller";
import CrawlService from "@/services/crawl-service";

useContainer(Container);

const app = createExpressServer({
  controllers: [CrawlController],
  defaultErrorHandler: false,
});

exports.api = onRequest({ region: ["asia-northeast3"] }, app);

exports.crawl = onSchedule(
  {
    schedule: "every 30 minutes",
    timeZone: "Asia/Seoul",
    region: "asia-northeast3",
  },
  async () => {
    const crawlService: CrawlService = Container.get(CrawlService);
    await crawlService.crawlAllBoards();
  },
);
