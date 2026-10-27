import express from "express";
import type { Request, Response } from "express";
import userRouter from "./routes/users.router.ts";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();
app.use(express.json());

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Retrieved Successfully",
  });
});

app.use("/api/users", userRouter);
export default app;
