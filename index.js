// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip || req.socket.remoteAddress;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  res.json({ ipaddress, language, software });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
