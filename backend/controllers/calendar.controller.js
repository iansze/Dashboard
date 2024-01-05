import { connectToDatabase } from "../index.js";

export const postEvents = async (req, res) => {
  let connection;

  try {
    const { id, title, start, end, allDay } = req.body;
    const startDate = new Date(start).toISOString().split("T")[0];
    const endDate = new Date(end).toISOString().split("T")[0];
    const allDayBool = allDay ? 1 : 0;

    connection = await connectToDatabase();
    const result = await connection.execute(
      `
      INSERT INTO DATE_EVENTS (ID, TITLE, start_date , end_date, ALLDAY) VALUES (:id, :title, TO_DATE(:start_datedate, 'YYYY-MM-DD'), TO_DATE(:end_datedate, 'YYYY-MM-DD'), :allDayBool)`,
      [id, title, startDate, endDate, allDayBool]
    );
    await connection.commit();
    res.status(201).json({ message: "Order created successfully", order: result });
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
