import { UserModel } from "../models/user-model";
import { DB_DATABASE } from "../database/database";

const database: UserModel[] = [];

// Conexão com banco de dados
DB_DATABASE.connect((err) => {
  if (err) throw err;
  console.log("Connected database with ID: " + DB_DATABASE.threadId);
});

// Listar todos os usuários
export const getFindAllUsers = async (): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users`;

  return new Promise((resolve, reject) => {
    DB_DATABASE.query(sql, async (err: any, results: UserModel[]) => {
      if (err) reject(err)
        resolve(results)
    })
  }) 
};

// Lista usuário pelo ID
export const getFindUserById = async (
  id: number
): Promise<UserModel> => {

  const sql = `SELECT * FROM users WHERE id = ?`

  return new Promise((resolve, reject) => {
    DB_DATABASE.query(sql, [id], async (err, results) => {
      if(err) reject(err)

      const users = results as UserModel[]

      if(users.length === 0) return reject(new Error(`Usuário com ID ${id} não encontrado.`))

      if(users.length > 1) return reject(new Error(`Mais de um usuário encontrado com ID ${id}.`))

        resolve(users[0])
    })
  })
};

// Inserir um novo usuário
export const insertUser = async (user: UserModel) => {
  // SQL
  const { id, name, phone } = user;
  let sql = `INSERT INTO users (id, name, phone) VALUES (${id}, '${name}', '${phone}')`;

  // Executar comando SQL
  DB_DATABASE.query(sql, function (error: any, results: any) {
    if (error) throw error;
  });
};

// Alterar os dados de um usuário
export const updateUser = async (id: number, user: UserModel) => {
  const indexUser = database.findIndex((user) => user.id === id);

  if (indexUser !== -1) {
    database[indexUser].name = user.name;
    database[indexUser].phone = user.phone;
  }

  return database[indexUser];
};

// Remover um usuário
export const deleteUser = async (id: number) => {
  let found = false;
  const indexUser = database.findIndex((user) => user.id === id);

  if (indexUser !== -1) {
    found = true;
    database.splice(indexUser, 1);
  }

  return found;
};
