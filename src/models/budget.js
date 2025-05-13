import { turso } from "../db/turso.js";

export const saveBudgetModel = async (budget) => {
  try {
    const { nombre, email, destino, fecha, mensaje, user } = budget;

    const image = await turso.execute(
      "SELECT image FROM destinations WHERE id = ?",
      [destino]
    );
   
    const result = await turso.execute(
      "INSERT INTO budget (name, email, destination, date, message, user, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, email, destino, fecha, mensaje, user, image.rows[0].image]
    );

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
    
  }
}

export const getBudgetsModel = async (user) => {
  try {
    const result = await turso.execute("SELECT budget.*, destinations.name AS destination_name FROM budget JOIN destinations ON budget.destination = destinations.id WHERE user = ?", [user]);

    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  
  }
}
