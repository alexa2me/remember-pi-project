import * as jwt from "jsonwebtoken";

export interface IAuthenticator {
  generateToken(id: string, expiresIn?: string): string;
  getTokenData(token: string): string;
}

export class Authenticator implements IAuthenticator {
  public generateToken(
    id: string,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getTokenData(token: string): string {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;

    return payload.id;
  }
}

export default new Authenticator();