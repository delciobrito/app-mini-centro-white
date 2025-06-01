interface UserModel {
  id: number;
  name: string;
}

const database: UserModel[] = [
  { id: 1, name: "Delcio" },
  { id: 2, name: "Liliane" },
];

export const getUsersList = async (): Promise<UserModel[]> => {
  return database;
};

export const getUserById = async (
  id: number
): Promise<UserModel | undefined> => {
  return database.find((user) => user.id === id);
};
