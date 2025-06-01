import { UserModel } from "../models/user-model";

const database: UserModel[] = [
  { id: 1, name: "Delcio", telephone: 71987654321 },
  { id: 2, name: "Liliane", telephone: 71987654321 },
];

export const getUsersFindAll = async (): Promise<UserModel[]> => {
  return database;
};

export const getUserFindById = async (
  id: number
): Promise<UserModel | undefined> => {
  return database.find((user) => user.id === id);
};
