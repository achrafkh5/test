// server.js
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/**
 * /api -> return current time
 */
app.get("/api", (req, res) => {
  const time = new Date();
  return res.json({
    unix: time.getTime(),        // Number (milliseconds)
    utc: time.toUTCString(),     // String like "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
/**
 * /api/:date -> handle:
 *  - plain unix milliseconds (e.g. 1451001600000)
 *  - normal date strings parsed by new Date(dateString)
 */
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let time;

  // If the param is a number string (all digits, maybe negative)
  // we should treat it as milliseconds since epoch.
  if (/^-?\d+$/.test(date)) {
    time = new Date(parseInt(date));
  } else {
    // treat as date string (e.g. "2015-12-25" or "December 25, 2015")
    time = new Date(date);
  }

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
