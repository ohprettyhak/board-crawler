import { JsonController, Get } from "routing-controllers";
import { Service } from "typedi";

import { Board } from "@/entities/board";
import { Organization } from "@/entities/organization";
import { BoardRepository } from "@/repositories/board-repository";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { CrawlService } from "@/services/crawl-service";

@Service()
@JsonController("/crawl")
export class CrawlController {
  constructor(
    private crawlService: CrawlService,
    private organizationRepository: OrganizationRepository,
    private boardRepository: BoardRepository,
  ) {}

  @Get("/")
  async crawl() {
    await this.crawlService.crawlAllBoards();
    return { message: "Crawling started" };
  }

  @Get("/temp-data")
  async addTempData() {
    const organizations: Organization[] = [
      { id: "hufs", name: "한국외국어대학교" },
    ];

    const boards: Board[] = [
      {
        id: "hufs_soft",
        name: "AI교육원",
        organizationId: "hufs",
        engine: "builder",
        url: "https://builder.hufs.ac.kr/user/indexSub.action?codyMenuSeq=129898191&siteId=soft",
      },
      {
        id: "hufs_computer",
        name: "컴퓨터공학부",
        organizationId: "hufs",
        engine: "builder",
        url: "https://computer.hufs.ac.kr/bbs/computer/1926/artclList.do",
      },
    ];

    for (const organization of organizations) {
      await this.organizationRepository.save(organization);
    }

    for (const board of boards) {
      await this.boardRepository.save(board);
    }

    return { message: "Temp data added" };
  }
}
