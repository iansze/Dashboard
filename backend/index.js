import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import OracleDB from "oracledb";
import usersRouter from "./routes/users.route.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

export async function connectToDatabase() {
  try {
    const connection = await OracleDB.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      privilege: OracleDB.SYSDBA,
    });
    return connection;
  } catch (err) {
    console.error("Error connecting to database: ", err);
    throw err;
  }
}

app.use("/api/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, Content-Type, Accept, Authorization,X-Api-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");

  next();
});