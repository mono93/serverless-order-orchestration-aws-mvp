import type { Request, Response } from "express";

export const healthCheckHandler = (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", now: new Date().toISOString() });
};
