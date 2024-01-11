import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../server.js";
import { convertDbRowsToObjects } from "../utils/convertDbRowsToObjects.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let connection;

  try {
    connection = await connectToDatabase();
    const isExistingEmail = await connection.execute(`SELECT * FROM MEMBERS WHERE EMAIL = :email`, {
      email,
    });

    if (isExistingEmail.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await connection.execute(
      `INSERT INTO MEMBERS (USERNAME, EMAIL, PASSWORD) VALUES (:username, :email, :hashedPassword)`,
      [username, email, hashedPassword]
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

export const login = async (req, res, next) => {
  const { username, password: formPassword } = req.body;
  let connection;

  try {
    connection = await connectToDatabase();
    const existingUser = await connection.execute(
      `SELECT * FROM MEMBERS WHERE USERNAME = :username`,
      { username }
    );

    if (existingUser.rows.length < 0) {
      return res.status(400).json({ message: "User not exists" });
    }

    const isVaildPassword = await bcrypt.compare(formPassword, existingUser.rows[0][3]);

    if (!isVaildPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: existingUser.MEMBER_ID }, process.env.JWT_SECRET_KEY);

    const member = convertDbRowsToObjects(existingUser.metaData, existingUser.rows)[0];
    const { password, ...memberWithoutPassword } = member;

    await connection.commit();
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User logged in successfully", member: memberWithoutPassword });
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

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
};
