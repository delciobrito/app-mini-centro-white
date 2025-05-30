import { Request, Response } from "express";
import { getUserService } from "../services/users-service";

export const getUser = async (request: Request, response: Response) => {
  const data = await getUserService();
  response.status(200).json(data);
};
