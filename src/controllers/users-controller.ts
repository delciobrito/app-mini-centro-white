import { Request, Response } from "express";
import { getUserService } from "../services/users-service";

export const getUser = async (req: Request, res: Response) => {
  const httpResponse = await getUserService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
