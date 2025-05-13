import bcrypt from "bcryptjs";
import { turso } from "../db/turso.js";

export const getUsersModel = async () => {
  try {
    const result = await turso.execute("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};

export const createUserModel = async (user) => {
  try {
    const { email, name, surnames, password } = user;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const result = await turso.execute(
      "INSERT INTO users (email, name, surnames, password) VALUES (?, ?, ?, ?) RETURNING *",
      [email, name, surnames, encryptedPassword]
    );

    if (result.rows.length === 0) {
      throw new Error("User creation failed");
    }

    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};

export const getUser = async ({ name, password }) => {
  try {
    const result = await turso.execute(
      "SELECT id, email, name, surnames, password FROM users WHERE name = ?",
      [name]
    );

    if (result.rows.length === 0) {
      return { error: "User not found" };
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    delete user.password;

    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};
