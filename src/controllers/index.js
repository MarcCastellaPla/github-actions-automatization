import { createUserModel, getUser } from "../models/users.js";
import { getPlanesModel } from "../models/plane.js";
import { getDestinationsApi, getPlanesApi } from "../controllers/api.js";

export const logout = (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
}

export const createUser = async (req, res) => {
  try {
    const newUser = await createUserModel(req.body);

    res.cookie("user", newUser.name, { maxAge: 2 * 24 * 60 * 60 * 1000 });

    if (req.body.redirect) {
      return res.redirect("/")
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const login = async (req, res) => { 
  try {
    const user = await getUser(req.body);

    if (user.error) {
      if (req.body.redirect) {
        return res.render("login", { error: user.error });
      }

      return res.status(401).json({ message: user.error });
    }

    res.cookie("user", user.name, { maxAge: 2 * 24 * 60 * 60 * 1000 });

    if (req.body.redirect) {
      return res.redirect("/")
    }

    res.status(200).json(user);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getPlanes = async (req, res) => {
  const planes = await getPlanesApi();

  res.render("aviones", { planes });
}

export const getDestinations = async (req, res) => {
  const destinations = await getDestinationsApi();
  
  res.render("destinos", { destinations });
}
