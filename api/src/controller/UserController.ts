import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import userBusiness from "../business/user/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  async signUp(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      const token = await userBusiness.signUp(input);

      res.status(200).send({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
    }

    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await userBusiness.login(loginData);

      res.status(200).send({ token });
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
    }

    await BaseDatabase.destroyConnection();
  }
}
