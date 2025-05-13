import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";
import indexRoutes from "./routes/index.js";
import { checkAuthenticationApi } from "./middlewares/autentication.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.currentUrl = req.path;
  res.locals.username = req.cookies.user || null;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api", checkAuthenticationApi, apiRoutes);
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
