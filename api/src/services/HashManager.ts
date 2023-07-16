import * as bcrypt from "bcryptjs";

export interface IHashManager {
  hash(text: string): string;
  compare(text: string, hash: string): boolean;
}

export class HashManager implements IHashManager {
  public hash(text: string): string {
    const rounds = 12;
    const salt = bcrypt.genSaltSync(rounds);
    const result = bcrypt.hashSync(text, salt);
    return result;
  }

  public compare(text: string, hash: string): boolean {
    return bcrypt.compareSync(text, hash);
  }
}
export default new HashManager();
