import { Service } from 'typedi';

// import { Article } from '@/entities/article';
// import { Subscriber } from '@/entities/subscriber';
// import SubscriberRepository from '@/repositories/subscriber-repository';

@Service()
export default class NotifyService {
  // constructor(private subscriberRepository: SubscriberRepository) {}
  // async notifySubscribers(article: Article): Promise<void> {
  //   const subscribers: Subscriber[] = await this.subscriberRepository.findByBoardId(
  //     article.boardId,
  //   );
  // for (const subscriber of subscribers) {
  //   await this.sendNotification(subscriber, article);
  // }
  // }
}
