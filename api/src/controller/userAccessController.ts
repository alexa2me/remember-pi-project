import { Response, Request } from "express";
import connection from "../data/connection";
import { signUp, login, deleteUser, updateUser } from "../data/userAccessQueries";
import { generateToken } from "../services/authenticator";
import { getTokenData } from "../services/authenticator";
import { compareHash, generateHash } from "../services/hashManager";
import { generateId } from "../services/idGenerator";
import { user } from "../types/user";

export default class UserAccessController {
  signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password ) {
        res.statusCode = 422;
        throw new Error(
          "Preencha todos os campos."
        );
      }

      if (!email.includes("@")) {
        throw new Error("E-mail inválido");
      }

      if (password.length < 6) {
        throw new Error("A senha deve conter pelo menos 6 caracteres.");
      }

      const [user] = await connection("users").where({ email });

      if (user) {
        res.statusCode = 409;
        throw new Error("Email já está cadastrado");
      }

      const newUser: user = {
        id: generateId(),
        name,
        email,
        password: generateHash(password),
      };

      const token: string = generateToken({
        id: newUser.id
      });

      await signUp(newUser);

      res.status(200).send(token);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.statusCode = 422;
        throw new Error("Para fazer o login informe e-mail e senha");
      }

      if (!email.includes("@")) {
        throw new Error("E-mail inválido");
      }

      const user = await login(email, password);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordIsCorrect: boolean = compareHash(password, user.password);

      if (!passwordIsCorrect) {
        throw new Error("Senha incorreta");
      }

      const token: string = generateToken({
        id: user.id,
      });

      res.status(200).send({ token: token});
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) =>{
    try  {
      const { id } = req.params;
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);
  
      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
      
      await deleteUser(id);

      res.status(200).send({ messagem: 'Usuário deletado com sucesso!'});
    } catch(err) {
      res.status(400).send({
        message: err.message,
      });
    }

  };

  editUser = async (req: Request, res: Response) =>{
    try {
      const {id} = req.params;
      const {name, email, password} = req.body;
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);

      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }

      await updateUser(id,name,email,password);

      res.status(200).send({ messagem: 'Usuário editado com sucesso!'});
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  };
}