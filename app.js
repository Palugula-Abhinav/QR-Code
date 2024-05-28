const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");
app.use(express.static("public"));
app.listen(process.env.PORT || 2001, function () {
  console.log("Listening on port 2000");
});
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const postReqData = req.body.input;
  const postRequest = https.request(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${postReqData}&format=svg&color=fff&bgcolor=2b7efa`,
    (response) => {
      var resData = "";
      response.on("data", (data) => {
        resData += data;
      });
      response.on("end", () => {
        res.render("index", { resData: JSON.stringify(resData) });
      });
    }
  );
  postRequest.end();
});
