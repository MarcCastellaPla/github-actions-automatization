import { Router } from 'express';
import { getDestinations, getPlanes, getUsers } from '../controllers/api.js';

const router = Router();

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
})

router.get("/destinations", getDestinations);

router.get("/planes", getPlanes);

router.get("/users", getUsers);

router.get("/presupuesto", (req, res) => {
  res.render("presupuesto");
});

export default router;
