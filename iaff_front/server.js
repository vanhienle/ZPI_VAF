const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const privateKeyAndCert = fs.readFileSync("IAFFWebApp.pem", "utf8");

https
  .createServer(
    {
      key: privateKeyAndCert,
      cert: privateKeyAndCert,
    },
    app
  )
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  });
