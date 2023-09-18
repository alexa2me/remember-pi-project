import { Response, Request } from "express";
import connection from "../data/connection";
import {
  signUp,
  login,
  deleteUser,
  resetPassword,
  editUser,
  getUserById
} from "../data/userAccessQueries";
import { generateToken } from "../services/authenticator";
import { getTokenData } from "../services/authenticator";
import { compareHash, generateHash } from "../services/hashManager";
import { generateId } from "../services/idGenerator";
import mailTransporter from "../services/mailTransporter";
import { user } from "../types/user";
import { validateEmail } from "../services/validateEmail";
import { deleteAllPostsByUserId } from "../data/postQueries";

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

     validateEmail(email);

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

  getUserById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);

      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }

      const user = await getUserById(verifiedToken.id);

      const userData = {
        name: user.name,
        email: user.email,
      };

      res.status(200).send({ user: userData });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  };

  editUser = async (req: Request, res: Response) =>{
    try {
      const {name, email} = req.body;
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);

      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
      
      validateEmail(email);

      await editUser(verifiedToken.id, name, email);

      res.status(200).send({ message: 'Usuário editado com sucesso!'});
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) =>{
    try  {
      const token = req.headers.authorization;
      const verifiedToken = getTokenData(token);
  
      if (!verifiedToken) {
        res.statusCode = 401;
        throw new Error("Não autorizado");
      }
      
      await deleteAllPostsByUserId(verifiedToken.id);
      await deleteUser(verifiedToken.id);

      res.status(200).send({ message: 'Usuário removido com sucesso!'});
    } catch(err) {
      res.status(400).send({
        message: err.message,
      });
    }

  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      const user = await connection("users").where({ "email": email });

      if(!user){
        res.statusCode = 400;
        throw new Error("Usuario não encontrado!");
      }

      const characters = "abcdefABCDEF12345!@#$%&*";
      let newPassword = "";
      for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * (characters.length - 1));
        newPassword += characters[index];
      }

      const newHash = generateHash(newPassword);
      await resetPassword(newHash, email);

      await mailTransporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Sua nova senha Remember",
        text: `Sua nova senha é ${newPassword}`,
        html: `<html>
        <head>
          <style>
            body {
              background-color: #734A91;
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              color: white;
            }
            .header {
              font-size: 40px;
              margin: 40px;
              border-bottom: 1px solid white;
              padding-bottom: 10px;
            }
            p {
              font-size: 18px;
              color: white;
              text-align: left;
            }
            .main-text {
              margin: 0 40px;
            }
            .footer {
              font-size: 14px;
              color: white;
              margin-top: 40px;
              text-align: center;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">Remember</div>
          <p class="main-text">Esta é a sua nova senha: <strong>${newPassword}</strong><br /><br />
            Sabemos que é uma senha estranha e talvez difícil de memorizar e por enquanto
            ainda não é possível alterá-la, mas estamos trabalhando nisso e em breve teremos novidades. <br />
            Caso esqueça novamente, basta recuperá-la uma outra vez.<br /><br />Time Remember</p>
          <p class="footer">Este é um e-mail automático, não responda.</p>
        </body>
      </html>`,
      });

      res.status(200).send({ message: 'Sua nova senha foi enviada para o seu e-mail.'});
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
}