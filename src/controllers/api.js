import { getDestinationsModel } from "../models/destination.js";
import { getPlanesModel } from "../models/plane.js";
import { getUsersModel } from "../models/users.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await getDestinationsModel();
    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPlanes = async (req, res) => {
  try {
    const planes = await getPlanesModel();
    res.json(planes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersModel();
    res.json(users);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getPlanesApi = async (req, res) => {
  try {
    const planes = await getPlanesModel();
    
    return planes;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

export const getDestinationsApi = async (req, res) => {
  try {
    const destinations = await getDestinationsModel();
    
    return destinations;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
}
