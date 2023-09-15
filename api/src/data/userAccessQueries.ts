import connection from "./connection";
import { user } from "../types/user";
import { generateHash } from "../services/hashManager";

export const signUp = async (user: user): Promise<any> => {
  await connection("users").insert(user);
};

export const login = async (email: string, password: string): Promise<any> => {
  const result = await connection("users")
    .select("*")
    .where("email", `${email}`);

  return result[0];
};

export const deleteUser = async (id: string): Promise<any> => {
  await connection("users").where("id", id).delete();
};

export const updateUser = async (id: string, newName: string, newEmail: string, newPassword: string): Promise<void> => {
  await connection("users")
    .where("id", id)
    .update({
      name: newName,
      email: newEmail,
      password: generateHash(newPassword)
    });
};

export const getUserById = async (id: string): Promise<any> => {
  const result = await connection("users")
    .select("name", "email")
    .where("id", id);

  return result[0];
};

export const resetSenha = async (
  newHash: string,
  id: string
): Promise<void> => {
  await connection("users").update("password", newHash).where("id", id);
};

