import express, { Express, Router } from "express";
import cors from "cors";

export interface AppRoutes {
  path: string;
  handle: Router;
}

export default class App {
  private port: number = Number(process.env.PORT) || 3003;
  private express: Express = express();

  constructor(private routes: AppRoutes[]) {}

  public init(): App {
    this.middlewares();
    this.router();
    this.check();

    return this;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private router(): void {
    this.routes.forEach((route) => {
      this.express.use(route.path, route.handle);
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private check(): void {
    this.express.get("/", (_, res) => {
      res.send({ message: "Connection is on!" });
    });
  }
}