import { v4 } from "uuid";

export interface IIdGenerator {
  generate(): string;
}

export class IdGenerator implements IIdGenerator {
  generate(): string {
    return v4();
  }
}

export default new IdGenerator();
