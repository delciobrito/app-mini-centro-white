import { UserModel } from "../models/user-model";

const database: UserModel[] = [
  { id: 1, name: "Delcio", phone: "71987654321" },
  { id: 2, name: "Liliane", phone: "71987654321" },
];

export const getFindAllUsers = async (): Promise<UserModel[]> => {
  return database;
};

export const getFindUserById = async (
  id: number
): Promise<UserModel | undefined> => {
  return database.find((user) => user.id === id);
};

export const insertUser = async (user: UserModel) => {
  database.push(user)
};

export const updateUser = async (id: number, user: UserModel) => {
  const indexUser = database.findIndex((user) => user.id === id);

  if (indexUser !== -1) {
    database[indexUser].name = user.name;
    database[indexUser].phone = user.phone;
  }

  return database[indexUser];
};

export const deleteUser = async (id: number) => {
  let found = false;
  const indexUser = database.findIndex((user) => user.id === id);

  if (indexUser !== -1) {
    found = true;
    database.splice(indexUser, 1);
  }

  return found;
};
