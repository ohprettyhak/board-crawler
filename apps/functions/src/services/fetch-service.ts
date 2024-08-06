import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import { GENERATOR } from '@/constants/generator';
import { EngineFactory } from '@/engines/engine-factory';
import { Engine } from '@/engines/engine-interface';
import { Article } from '@/entities/article';
import { Board } from '@/entities/board';
import { FetchQueue } from '@/entities/fetch-queue';
import ArticleRepository from '@/repositories/article-repository';
import BoardRepository from '@/repositories/board-repository';
import FetchQueueRepository from '@/repositories/fetch-queue-repository';
import GeneratorRepository from '@/repositories/generator-repository';

@Service()
export default class FetchService {
  constructor(
    private boardRepository: BoardRepository,
    private fetchQueueRepository: FetchQueueRepository,
    private generatorRepository: GeneratorRepository,
    private articleRepository: ArticleRepository,
    private engineFactory: EngineFactory,
  ) {}

  async crawlAndQueueAllBoards(): Promise<void> {
    const boards: Board[] = await this.boardRepository.findAll();

    const crawlPromises: Promise<void>[] = boards.map(async board => {
      const engine: Engine = this.engineFactory.getEngine(board.engine);
      const newArticleUrls: string[] = await engine.fetchArticleUrls(board);

      const fetchQueueItems: FetchQueue[] = newArticleUrls.map(url => ({
        id: uuid(),
        boardId: board.id,
        organizationId: board.organizationId,
        processed: false,
        engine: board.engine,
        url: `${board.baseUrl}/${url}`.replace(/\/{2,}/g, '/'),
      }));

      await this.fetchQueueRepository.createAll(fetchQueueItems);
    });

    await Promise.all(crawlPromises);
  }

  async crawlArticleContent(): Promise<Article[]> {
    const fetchQueues: FetchQueue[] = await this.fetchQueueRepository.findUnprocessedQueues(5);
    const articles: Article[] = [];

    await Promise.all(
      fetchQueues.map(async fetchQueue => {
        try {
          const engine: Engine = this.engineFactory.getEngine(fetchQueue.engine);
          const { title, content, timestamp, author } = await engine.fetchArticleContent(
            fetchQueue.url,
          );

          const ref = await this.generatorRepository.createWithRef({
            prompt: `${GENERATOR.BASE_PROMPT}${content}\n</Content>`,
          });

          const response: string = await new Promise(resolve => {
            this.generatorRepository.subscribeToChanges(ref, (response: string) => {
              resolve(response);
            });
          });

          const article: Article = {
            id: uuid(),
            title,
            author,
            url: fetchQueue.url,
            content: response,
            organizationId: fetchQueue.organizationId,
            boardId: fetchQueue.boardId,
            generatorId: ref.id,
            publishedAt: new Date(timestamp),
          };

          await this.articleRepository.create(article);

          fetchQueue.processed = true;
          fetchQueue.generatorId = ref.id;
          await this.fetchQueueRepository.update(fetchQueue);

          articles.push(article);
        } catch (error) {
          console.error(`Failed to process fetchQueue with id ${fetchQueue.id}:`, error);
        }
      }),
    );

    return articles;
  }
}
