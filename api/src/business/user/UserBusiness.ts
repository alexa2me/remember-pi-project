import { UserInputDTO, LoginInputDTO } from "../../model/User";
import userDatabase, { IUserDatabase } from '../../data/UserDatabase'
import idGenerator, { IIdGenerator } from "../../services/IdGenerator";
import authenticator, { IAuthenticator } from "../../services/Authenticator";
import hashGenerator, { IHashManager } from "../../services/HashManager";
import { CustomError } from "../../error/CustomError";
import { UserValidations } from './UserValidations'

export class UserBusiness extends UserValidations {
  constructor(
    private authenticator: IAuthenticator,
    private hashManager: IHashManager,
    private idGenerator: IIdGenerator,
    private userDatabase: IUserDatabase
  ) {
    super();
  }

  async signUp(user: UserInputDTO) {
    this.validateData(user);

    const userEmailFromDB = await this.userDatabase.getUserByEmail(user.email);
    if (userEmailFromDB) {
      throw new CustomError(
        "Algo deu errado, tente novamente mais tarde ou tente com outro email.",
        422
      );
    }

    const id = this.idGenerator.generate();

    const hashPassword = this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
      id,
      user.email,
      user.name,
      hashPassword
    );

    const accessToken = this.authenticator.generateToken(id);

    return accessToken;
  }

  async login(user: LoginInputDTO) {
    const userFromDB = await this.userDatabase.getUserByEmail(user.email);
    if (!userFromDB) {
      throw new CustomError("Credenciais inválidas", 401);
    }

    const hashCompare = this.hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    if (!hashCompare) {
      throw new CustomError("Credenciais inválidas", 401);
    }

    const accessToken = this.authenticator.generateToken(userFromDB.getId());

    if (!hashCompare) {
      throw new Error("Senha inválida");
    }

    return accessToken;
  }
}

export default new UserBusiness(
  authenticator,
  hashGenerator,
  idGenerator,
  userDatabase
);