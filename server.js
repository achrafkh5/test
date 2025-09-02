import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = 8000;

// Case 1: No date → current time
app.get("/api", (req, res) => {
  const time = new Date();
  res.json({
    unix: time.getTime(),
    utc: time.toUTCString(),
  });
});

// Case 2: Date provided
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let time;

  if (!isNaN(date)) {
    // treat as unix
    time = new Date(parseInt(date));
  } else {
    // treat as date string
    time = new Date(date);
  }

  if (time.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: time.getTime(),
    utc: time.toUTCString(),
  });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
