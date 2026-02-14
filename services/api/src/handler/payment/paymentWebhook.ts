import type { Request, Response } from "express";

const paymentWebhook = async (req: Request, res: Response) => {
  res.status(202).json({ message: "Payment webhook received successfully" });
};

export { paymentWebhook };
