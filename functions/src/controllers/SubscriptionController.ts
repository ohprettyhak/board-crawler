import { JsonController } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/subscriptions")
export default class SubscriptionController {}
