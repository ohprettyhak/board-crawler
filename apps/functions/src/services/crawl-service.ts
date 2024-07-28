import { Service } from "typedi";
// eslint-disable-next-line import/named
import { v1 as uuidv1 } from "uuid";

import { EngineFactory } from "@/engines/engine-factory";
import { Engine } from "@/engines/engine-interface";
import { Board } from "@/entities/board";
import { FetchQueue } from "@/entities/fetch-queue";
import BoardRepository from "@/repositories/board-repository";
import FetchQueueRepository from "@/repositories/fetch-queue-repository";

@Service()
export default class CrawlService {
  constructor(
    private boardRepository: BoardRepository,
    private fetchQueueRepository: FetchQueueRepository,
    private engineFactory: EngineFactory,
  ) {}

  async crawlAllBoards() {
    console.log(`Crawling all boards...`);
    const boards: Board[] = await this.boardRepository.findAll();

    const crawlPromises = boards.map(async board => {
      const engine: Engine = this.engineFactory.getEngine(board.engine);
      const urls: string[] = await engine.crawl(board);

      const urlQueues: FetchQueue[] = urls.map(url => ({
        id: uuidv1(),
        url,
        boardId: board.id,
        processed: false,
      }));

      await this.fetchQueueRepository.createAll(urlQueues);
    });

    await Promise.all(crawlPromises);
  }
}
