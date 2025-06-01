import * as UsersRepository from "../repositories/users-repository";
import * as HttpResponse from "../utils/http-helper";

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
  const data = await UsersRepository.getUserFindById(id)
  let response = null

  if(data) {
    response = await HttpResponse.ok(data)
  } else {
    response = await HttpResponse.noContent()
  }

  return response
}
