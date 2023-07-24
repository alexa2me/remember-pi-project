// import { config } from "dotenv";
// import App from "./app";
// import userHandle from './routes/UserRouter';

// config();

// const expressApp: App = new App([userHandle]);

// expressApp.init().listen();

import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3306, () => {
  console.log("Server is running at http://localhost:3306");
});
