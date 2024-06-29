import { Service } from "typedi";

import { EngineFactory } from "@/engines/engine-factory";
import { Engine } from "@/engines/engine-interface";
import { Board } from "@/entities/board";
import { BoardRepository } from "@/repositories/board-repository";

@Service()
export class CrawlService {
  constructor(
    private boardRepository: BoardRepository,
    private engineFactory: EngineFactory,
  ) {}

  async crawlAllBoards() {
    console.log(`Crawling all boards...`);
    const boards: Board[] = await this.boardRepository.findAll();

    const crawlPromises = boards.map(async board => {
      const engine: Engine = this.engineFactory.getEngine(board.engine);
      const urls: string[] = await engine.crawl(board);
      console.log(`Crawled data for board ${board.name}, ${urls}`);
    });

    await Promise.all(crawlPromises);
    console.log("Crawling all boards completed.");
  }
}
