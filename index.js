var express = require("express");
var app = express();
const cors = require("cors");

app.use(cors());

function getTime(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthName = date.toLocaleString("en-US", { month: "long" });

  let ReqIni = date;

  let dayOfMonth = ReqIni.getDate();
  let formattedDayOfMonth;

  // Handle special cases for 1st, 2nd, and 3rd
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    formattedDayOfMonth = dayOfMonth + "st";
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    formattedDayOfMonth = dayOfMonth + "nd";
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    formattedDayOfMonth = dayOfMonth + "rd";
  } else {
    formattedDayOfMonth = dayOfMonth + "th";
  }

  let formattedTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  });

  let time_requested = `${
    days[ReqIni.getDay()]
  } ${formattedDayOfMonth} of ${monthName} ${ReqIni.getFullYear()} ${formattedTime}`;
  console.log(time_requested);

  return time_requested;
}

app.get("/", function (req, res) {
  const randomNumber = getRandomNumber(5, 15);
  console.log(randomNumber);

  let sleep_time = randomNumber;
  let date = new Date();

  let time_requested = getTime(date);

  const p = new Promise(function (resolve) {
    setTimeout(() => {
      date = new Date();
      resolve(date);
    }, randomNumber * 1000);
  });

  p.then((data) => {
    date = new Date();
    let time_processed = getTime(date);

    // res.send(data);

    res.json({
      time_requested,
      sleep_time,
      time_processed,
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
