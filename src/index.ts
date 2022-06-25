import axios from "axios";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    console.log(url);
    const { data } = await axios.get(url);

    res.status(200).json({
      html: data,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

app.use(`/`, router);

export const handler = serverless(app);
export default app;
