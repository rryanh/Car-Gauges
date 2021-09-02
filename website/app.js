const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const router = express.Router();
const serialport = require("serialport");
const findArduino = function () {
  serialport
    .list()
    .then((ports) => {
      ports.forEach((port) => {
        if (port.productId == 7523) {
          console.log(`Device connected`);
          return port.path;
        }
      });
    })
    .catch((err) => {});
};

const myPort = findArduino();

let data = {
  boost: Math.random() * 36,
  oilTurbo: Math.random() * 115,
  oilPressure: Math.random() * 115,
  oilTurbo: Math.random() * 115,
};
// Static Files
app.use(express.static("public"));

// Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))

// Navigation
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/boost", function (req, res) {
  res.send(JSON.stringify(data.boost));
  data.boost = Math.random() * 36;
});

app.get("/oilPressure", function (req, res) {
  res.send(JSON.stringify(data.oilPressure));
  data.oilPressure = Math.random() * 115;
});

app.get("/oilTurbo", function (req, res) {
  res.send(JSON.stringify(data.oilTurbo));
  data.oilTurbo = Math.random() * 130;
});

app.get("/oilPan", function (req, res) {
  res.send(JSON.stringify(data.oilPan));
  data.oilPan = Math.random() * 100;
});

app.listen(port, () => console.info(`App listening on port ${port}`));

// list serial ports:
// serialport.list().then(
//   (ports) =>
//     ports.forEach((port) =>
//       console.log(port.path, port.manufacturer, port, port.vendorId)
//     ),
//   (err) => console.log(err)
// );
