const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const serialport = require("serialport");
const readline = require("@serialport/parser-readline");
const app = express();
const port = 5000;
const router = express.Router();
const arduino = require("./javascript/arduino_init");
const array = [0x80, 0x10, 0xf0, 0x01, 0xbf, 0x40];
/*
  FINDS ARDUINO NANO DEVICE FROM PORTS

  USES port.productId OF 7523 TO DETERMINE IF PORT DEVICE IS AN ARDUINO
*/
let data = {
  boost: 0,
  oilTemp: 0,
  oilPressure: 0,
};

arduino
  .getArduinoPort()
  .then((myport) => {
    const parser = myport.pipe(new readline({ delimiter: "\n" }));
    parser.on("data", (arduino_Data) => {
      //console.log("got word from arduino:", arduino_Data);
      let arduinoData = JSON.parse(arduino_Data);
      data.boost = arduinoData.boost;
      data.oilTemp = arduinoData.oilTemp;
      data.oilPressure = arduinoData.oilPressure;
    });

    setInterval(function () {
      myport.write("\n", (err) => {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
      });
    }, 95);
  })
  .catch((err) => {
    console.log(`Error communicating with Arduino `, err);
  });

/*
  BASE TEST DATA TO TEST FRONT END 
*/

// Static Files
app.use(express.static("public"));

/*
  GET ENDPOINTS
*/
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  console.log(path.join(__dirname, "public/index"));
});

app.get("/boost", function (req, res) {
  res.send(JSON.stringify(data.boost));
});

app.get("/oilPressure", function (req, res) {
  res.send(JSON.stringify(data.oilPressure));
});

app.get("/oiltemp", function (req, res) {
  res.send(JSON.stringify(data.oilTemp));
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
