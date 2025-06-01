import { Request, Response } from "express";
import * as Service from "../services/users-service";

export const getUser = async (req: Request, res: Response) => {
  const httpResponse = await Service.getUserService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const httpResponse = await Service.getUserByIdService(id)
  res.status(httpResponse.statusCode).json(httpResponse.body)
}
