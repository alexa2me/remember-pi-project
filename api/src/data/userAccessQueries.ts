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