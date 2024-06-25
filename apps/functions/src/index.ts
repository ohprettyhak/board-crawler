import "reflect-metadata";

import { onRequest } from "firebase-functions/v2/https";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

import AppController from "@/controllers/AppController";
import SubscriptionController from "@/controllers/SubscriptionController";

useContainer(Container);

const app = createExpressServer({
  controllers: [AppController, SubscriptionController],
  defaultErrorHandler: false,
});

exports.api = onRequest({ region: ["asia-northeast3"] }, app);
