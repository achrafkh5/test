import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = 8000;

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let time;

  // Case 1: No date provided → current time
  if (!date) {
    time = new Date();
  }
  // Case 2: Pure number string → treat as unix milliseconds
  else if (!isNaN(date)) {
    time = new Date(parseInt(date));
  }
  // Case 3: Date string
  else {
    time = new Date(date);
  }

  // Check validity
  if (time.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: time.getTime(),
    utc: time.toUTCString(),
  });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
