import express from "express"
import cors from "cors"
import airbnb from "./api/airbnb.route.js"

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/v1/airbnb", airbnb);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app 