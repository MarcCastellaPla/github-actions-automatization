import { turso } from "../db/turso.js";

export const getDestinationsModel = async () => {
  try {
    const result = await turso.execute("SELECT * FROM destinations");
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};
