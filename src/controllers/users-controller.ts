import { Request, Response } from "express";
import { getUserService } from "../services/users-service";
import { ok } from "../utils/http-helper";

export const getUser = async (request: Request, response: Response) => {
  const data = await getUserService();
  const res = await ok(data)

  response.status(res.statusCode).json(res.body);
};
