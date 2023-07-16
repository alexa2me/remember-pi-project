import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export interface IUserDatabase {
  createUser(
    id: string,
    email: string,
    name: string,
    password: string
  ): Promise<void>;

  getUserByEmail(email: string): Promise<User | undefined>;
}

export class UserDatabase extends BaseDatabase implements IUserDatabase {
  private static TABLE_NAME = "users";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message || error);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    if (!result[0]) {
      return undefined;
    }

    return User.toUserModel(result[0]);
  }
}

export default new UserDatabase();