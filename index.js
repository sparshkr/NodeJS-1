var express = require("express");
var app = express();

app.get("/", function (req, res) {
  const randomNumber = getRandomNumber(5, 15);
  console.log(randomNumber);
  let date = new Date();
  console.log(date);

  let ReqIni = date;
  const p = new Promise(function (resolve) {
    setTimeout(() => {
      date = new Date();
      resolve(date);
    }, randomNumber * 1000);
  });

  p.then((data) => {
    date = new Date();
    console.log(data.getHours());
    // res.send(data);
    InitialHour = ReqIni.getHours();
    InitialMinutes = ReqIni.getMinutes();
    InitialSeconds = ReqIni.getSeconds();
    FinalHour = date.getHours();
    FinalMinutes = date.getMinutes();
    FinalSeconds = date.getSeconds();
    res.json({
      InitialHour,
      InitialMinutes,
      InitialSeconds,
      FinalHour,
      FinalMinutes,
      FinalSeconds,
    });
  });
});
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
