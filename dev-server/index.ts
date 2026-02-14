import express from "express";
import { environment } from "../services/shared/src/env";
import { handlers } from "../services/api/src/handler";

const app = express();

app.get("/api/health", handlers.health);

app.listen(environment.port, () => {
  console.log(`Dev server is running on port ${environment.port}`);
});
