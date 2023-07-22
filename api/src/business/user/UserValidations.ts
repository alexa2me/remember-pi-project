import { CustomError } from "../../error/CustomError";
import { UserInputDTO } from "../../model/User";

export class UserValidations {
  private validateIfEmptyFields({
    email,
    name,
    password,
  }: UserInputDTO) {
    if (!email || !name || !password) {
      throw new CustomError(
        'Todos os campos devem ser preenchidos',
        422
      );
    }
  }

  private validateIfEmailValid(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new CustomError("E-mail inválido", 422);
    }
  }

  private validatePassword(password: string) {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{6}$/;
    if (!passwordRegex.test(password)) {
      throw new CustomError(
        "Sua senha não atende aos requisitos mínimos",
        422
      );
    }
  }

  protected validateData(data: UserInputDTO) {
    this.validateIfEmptyFields(data);
    this.validateIfEmailValid(data.email);
    this.validatePassword(data.password);
  }
}