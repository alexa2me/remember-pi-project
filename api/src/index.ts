import { config } from "dotenv";
import App from "./app";
import userHandle from './routes/UserRouter';

config();

const expressApp: App = new App([userHandle]);

expressApp.init().listen();
