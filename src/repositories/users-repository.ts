import { UserModel } from "../models/user-model";
import { DB_DATABASE } from "../database/database";

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
      if (err) reject(err);

      resolve(results);
    });
  });
};

// Lista usuário pelo ID
export const getFindUserById = async (id: number): Promise<UserModel> => {
  const sql = `SELECT * FROM users WHERE id = ?`;

  return new Promise((resolve, reject) => {
    DB_DATABASE.query(sql, [id], async (err, results) => {
      if (err) reject(err);

      const users = results as UserModel[];

      if (users.length === 0)
        return reject(new Error(`Usuário com ID ${id} não encontrado.`));

      if (users.length > 1)
        return reject(new Error(`Mais de um usuário encontrado com ID ${id}.`));

      resolve(users[0]);
    });
  });
};

// Inserir um novo usuário
export const insertUser = async (user: UserModel) => {
  // SQL
  const { id, name, phone } = user;
  let sql = `INSERT INTO users (id, name, phone) VALUES (?, ?, ?)`;

  // Executar comando SQL
  // DB_DATABASE.query(sql, [id, name, phone], (err, results) => {
  //   if (err) throw err;
  // });

  return new Promise((resolve, rejects) => {
    DB_DATABASE.query(sql, [id, name, phone], (err, results) => {
      if (err) rejects(new Error());

      resolve("Success!");
    });
  });
};

// Alterar os dados de um usuário
export const updateUser = async (
  id: number,
  user: UserModel
): Promise<string> => {
  const { name, phone } = user;

  const checkSql = `SELECT id FROM users WHERE id = ?`;
  const updateSql = `UPDATE users SET name = ?, phone = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    // Verifica se o dado existe
    DB_DATABASE.query(checkSql, [id], async (err, result) => {
      if (err) reject(new Error(`Usuário não existe`));

      const checkResult = result as any[];

      if (checkResult.length === 0) reject(new Error("Usuário não encontrado"));

      // Atualiza os dados
      DB_DATABASE.query(updateSql, [name, phone, id], (err) => {
        if (err) reject(new Error("Erro ao atualizar o usuário"));

        resolve("Usuário atualizado com sucesso");
      });
    });
  });
};

// Remover um usuário
export const deleteUser = async (id: number) => {
  const checksql = `SELECT id FROM users WHERE id = ?`;
  const deleteSql = `DELETE FROM users WHERE id = ?`;

  return new Promise((resolve, reject) => {
    DB_DATABASE.query(checksql, [id], async (err, result) => {
      if (err) reject(new Error("Erro ao verificar usuário no banco de dados"));

      const checkResult = result as any[];

      if (checkResult.length === 0) reject(new Error("Usuário não encontrado"));

      DB_DATABASE.query(deleteSql, [id], (err) => {
        if (err) reject(new Error("Erro ao remover o usuário"));

        resolve("Usuário removido com sucesso");
      });
    });
  });
};
