const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const { query } = require("./mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.post("/api/trackEvent", async (req, res) => {
  const clientInfo = {
    userAgent: req.headers["user-agent"],
    userIp: req.ip,
  };
  const sql = `INSERT INTO periondm.adv 
      ( 
        clientInfo,
        data
      ) 
        VALUES 
      (
        '${JSON.stringify(clientInfo)}',
        '${JSON.stringify(req.body)}'
      )`;

  try {
    await query(sql);
  } catch (error) {
    console.error("Error executing query", error);
  } 
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
