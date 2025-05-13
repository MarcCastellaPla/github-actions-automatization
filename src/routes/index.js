import { Router } from "express";
import { logout, createUser, login, getDestinations, getPlanes } from "../controllers/index.js";
import { checkAuthentication } from "../middlewares/autentication.js";
import { getBudgetsModel, saveBudgetModel } from "../models/budget.js";
import { getDestinationsApi } from "../controllers/api.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("registro");
});

router.post("/register", createUser);

router.post("/login", login);

router.get("/logout", checkAuthentication, logout);

router.get("/planes", checkAuthentication, getPlanes);

router.get("/destinations", checkAuthentication, getDestinations);

router.get("/budget", checkAuthentication, async (req, res) => {
  const destinations = await getDestinationsApi();
  const user = req.cookies.user;
  
  res.render("presupuesto", { destinations, user });
});

router.post("/budget", async (req, res) => {
  const result = await saveBudgetModel(req.body);

  res.redirect("/budgets")
});

router.get("/budgets", checkAuthentication, async (req, res) => {
  const user = req.cookies.user;
  const budgets = await getBudgetsModel(user);
  
  res.render("presupuestos", { budgets });
});


export default router;
