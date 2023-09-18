import connection from "./connection";
import { user } from "../types/user";

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

export const editUser = async (id: string, newName: string, newEmail: string): Promise<void> => {
  await connection("users")
    .where("id", id)
    .update({
      "name": newName,
      "email": newEmail,
    });
};

export const getUserById = async (id: string): Promise<any> => {
  const result = await connection("users")
    .select("name", "email")
    .where("id", id);

  return result[0];
};

export const resetPassword = async (newHash: string, email: string): Promise<void> => {
  await connection("users").update("password", newHash).where("email", email);
};

