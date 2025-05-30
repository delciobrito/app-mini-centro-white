 import { Request, Response } from "express";
 
 export const getUser = (request: Request, response: Response) => {
    response.json({ message: "Deu certo" });
  }