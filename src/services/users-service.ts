import * as UsersRepository from "../repositories/users-repository";
import { noContent, ok } from "../utils/http-helper";

export const getUserService = async () => {
  const data = await UsersRepository.getUsersList();
  let response = null;

  if (data) {
    response = await ok(data);
  } else {
    response = await noContent();
  }

  return response;
};
