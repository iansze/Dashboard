import { connectToDatabase } from "../server.js";
import { convertDbRowsToObjects } from "../utils/convertDbRowsToObjects.js";

export const createEvents = async (req, res) => {
  let connection;
  try {
    const { id, title, start, end, allDay, member_id } = req.body;
    const startDate = start.split("T")[0];
    const endDate = end.split("T")[0];
    const allDayBool = allDay ? 1 : 0;

    connection = await connectToDatabase();
    const result = await connection.execute(
      `
      INSERT INTO DATE_EVENTS (ID, TITLE, start_date , end_date, ALLDAY,member_id) VALUES (:id, :title, TO_DATE(:start_datedate, 'YYYY-MM-DD'), TO_DATE(:end_datedate, 'YYYY-MM-DD'), :allDayBool,:member_id)`,
      [id, title, startDate, endDate, allDayBool, member_id]
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

export const getEvents = async (req, res) => {
  let connection;
  try {
    connection = await connectToDatabase();

    if (req.query.member_id === "undefined") {
      return res.status(200).json([]);
    }
    const result = await connection.execute("SELECT * FROM DATE_EVENTS WHERE member_id = :id", [
      req.query.member_id,
    ]);
    const events = convertDbRowsToObjects(result.metaData, result.rows);
    res.status(200).json(events);
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

export const deleteEvent = async (req, res) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const eventId = req.body.id;
    const result = await connection.execute(
      `DELETE FROM DATE_EVENTS WHERE ID = :eventId AND MEMBER_ID = :memberId`,
      [eventId, req.body.member_id]
    );
    await connection.commit();
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

export const deleteAllEvent = async (req, res) => {
  let connection;

  try {
    connection = await connectToDatabase();
    const result = await connection.execute(`DELETE FROM DATE_EVENTS WHERE MEMBER_ID = :memberId`, [
      req.query.member_id,
    ]);
    await connection.commit();
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
