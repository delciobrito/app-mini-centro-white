import { UserModel } from "../models/user-model";
import * as UsersRepository from "../repositories/users-repository";
import * as HttpResponse from "../utils/http-helper";
import { z, ZodError } from "zod";

export const getUserService = async () => {
  const data = await UsersRepository.getFindAllUsers();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const getUserByIdService = async (id: any) => {
  let response = await HttpResponse.noContent();
  let data = null;
  const validationSchema = z.coerce.number().int();

  try {
    validationSchema.parse(id);
    data = await UsersRepository.getFindUserById(id);

    return (response = await HttpResponse.ok(data));
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
    if (err) {
      response = await HttpResponse.internalServerError().then();
      response.body = {
        error: err instanceof Error ? err.message : String(err),
      };

      return response;
    }
  }

  return response;
};

export const postUserService = async (user: UserModel) => {
  let response = await HttpResponse.badRequest();
  let data = null;
  const validationsSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string({ required_error: "Name is required!" }),
    phone: z
      .string({ required_error: "Phone is required!" })
      .regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/, "Phone invalid!"),
  });

  try {
    validationsSchema.parse(user);
    data = await UsersRepository.insertUser(user);
    response = await HttpResponse.created().then();
    response.body = {
      message: data,
    };
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

  return response;
};

export const updateUserService = async (id: any, user: UserModel) => {
  let data = null;
  let response = await HttpResponse.notFound();

  const idValidationsSchema = z.coerce.number().int();
  const validationSchema = z.object({
    name: z.string(),
    phone: z
      .string()
      .regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/g, "Phone invalid!"),
  });

  try {
    idValidationsSchema.parse(id);
    validationSchema.parse(user);
    data = await UsersRepository.updateUser(id, user);

    response = await HttpResponse.ok({ message: data });
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

    if (err) {
      response = await HttpResponse.notFound().then();
      response.body = {
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  return response;
};

export const deleteUserService = async (id: any) => {
  let response = await HttpResponse.notFound();
  let data = null;
  const paramsSchema = z.coerce.number().int();

  try {
    paramsSchema.parse(id);
    data = await UsersRepository.deleteUser(id);
    response = await HttpResponse.ok({ message: data });
  } catch (err) {
    if (err instanceof ZodError) {
      response = await HttpResponse.badRequest().then();
      response.body = {
        message: "Validation error!",
        errors: err.errors.map((e) => ({
          mensagem: e.message,
        })),
      };
      return response;
    }

    if(err) {
      response = await HttpResponse.notFound().then()
      response.body = {
        error: err instanceof Error ? err.message : String(err)
      }
    }
  }

  return response;
};
