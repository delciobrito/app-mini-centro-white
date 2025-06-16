import { Request, Response } from "express";
import * as Service from "../services/users-service";
import { any } from "zod";

export const getUser = async (req: Request, res: Response) => {
  const httpResponse = await Service.getUserService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const httpResponse = await Service.getUserByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postUser = async (req: Request, res: Response) => {
  const body = req.body;
  const httpResponse = await Service.postUserService(body);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const httpResponse = await Service.updateUserService(id, body);
  res.status(httpResponse.statusCode).json(httpResponse.body)
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const httpResponse = await Service.deleteUserService(id)
  res.status(httpResponse.statusCode).json(httpResponse.body)
}
