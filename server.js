
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = 8000;

app.get("/api", (req, res) => {
  const time = new Date();
  res.json({
    unix: Math.floor(time.getTime()),
    utc: time.toUTCString()
  });
});


app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  try{   
     if(isNaN(date) && !isNaN(Date.parse(date))) {

        const time = new Date(date);
        const utc = time.toUTCString();
        const unix = Math.floor(time.getTime());
        return res.json({ unix,utc });

      } else if(!isNaN(date)) {

        const time = new Date(Number(date));
        console.log(date,time);
        const utc = time.toUTCString();
        const unix = Math.floor(time.getTime());
        return res.json({ unix,utc });

      } else{

        console.log(Date.parse(date));
        return res.json({ error: "Invalid Date" });
        
      }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
