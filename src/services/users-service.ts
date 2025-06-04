import { UserModel } from "../models/user-model";
import * as UsersRepository from "../repositories/users-repository";
import * as HttpResponse from "../utils/http-helper";
import { z, ZodError } from "zod";

export const getUserService = async () => {
  const data = await UsersRepository.getUsersFindAll();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const getUserByIdService = async (id: number) => {
  const data = await UsersRepository.getUserFindById(id);
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const postUserService = async (user: UserModel) => {
  let response = null;

  const validationsSchema = z.object({
    id: z.number(),
    name: z.string({ required_error: "Name is required!" }),
    phone: z.string({ required_error: "Phone is required!" }).regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/,
  "Phone invalid!")
  });

  try {
    validationsSchema.parse(user);
    await UsersRepository.insertUser(user);
  } catch (err) {
    if (err instanceof ZodError) {
      response = await HttpResponse.badRequest().then();
      response.body = {
        message: "Validation error!",
        errors: err.errors.map((e) => ({
          campo: e.path.join(),
          mensagem: e.message,
        })),
      };
      return response;
    }
  }
  response = HttpResponse.created();

  return response;
};

export const updateUserService = async (id: number, user: UserModel) => {
  let data = null;
  let response = null;
  const validationShema = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/g,
  "Phone invalid!"),
  });

  try {
    validationShema.parse(user);
    data = await UsersRepository.updateUser(id, user);
  } catch (err) {
    if (err instanceof ZodError) {
      response = await HttpResponse.badRequest().then();
      response.body = {
        message: "Validation error!",
        errors: err.errors.map((e) => ({
          campo: e.path.join(),
          mensagem: e.message,
        })),
      };
    }
  }

  response = await HttpResponse.ok(data);

  return response;
};
