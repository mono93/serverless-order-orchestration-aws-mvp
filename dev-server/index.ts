import express from "express";
import { environment } from "../services/shared/src/env";
import { handlers } from "../services/api/src/handler";
import { Logger } from "../services/shared/src/log";
import { API_BASE_PATH } from "../services/shared/src/constant";

const app = express();
const apiRouter = express.Router();


apiRouter.get("/health", handlers.health);

apiRouter.post("/orders", handlers.createOrder);
apiRouter.get("/orders/:id", handlers.getOrder);

apiRouter.post("/payments/initiate", handlers.initiatePayment);
apiRouter.post("/payments/webhook", handlers.paymentWebhook);

app.use(API_BASE_PATH, apiRouter);

app.listen(environment.port, () => {
  Logger.info(`server is running on port ${environment.port}`);
});
