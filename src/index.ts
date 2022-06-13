import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
const router = express.Router();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

async function getHTML() {
  try {
    const response = await axios.get("https://www.naver.com");

    return response.data;
  } catch {
    throw new Error("monster not found");
  }
}

export async function handler(req) {
  console.log("req", req);
  try {
    const data = await getHTML();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
}
