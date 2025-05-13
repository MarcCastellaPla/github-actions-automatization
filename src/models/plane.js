import { turso } from "../db/turso.js";

export const getPlanesModel = async () => {
  try {
    const result = await turso.execute("SELECT * FROM planes");
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error" + `${err.message}`);
  }
};
