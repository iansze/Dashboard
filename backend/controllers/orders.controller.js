import { connectToDatabase } from "../index.js";

export const getOrders = async (req, res) => {
  let connection;

  try {
    connection = await connectToDatabase();
    const result = await connection.execute("SELECT * FROM ORDERS");
    res.status(200).json(result);
  } catch (error) {
    console.error("Database connection error: ", error);
    res.status(500).send("Error connecting to the database");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection: ", err);
      }
    }
  }
};
