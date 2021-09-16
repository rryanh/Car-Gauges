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

  USES port.productId OF "7523" TO DETERMINE IF PORT DEVICE IS AN ARDUINO
*/

arduino
  .getArduinoPort()
  .then((myport) => {
    const parser = myport.pipe(new readline({ delimiter: "\n" }));
    myport.on("open", () => {
      console.log("serial port open");
    });

    parser.on("data", (data) => {
      console.log("got word from arduino:", data);
    });
    setInterval(function () {
      myport.write(array + "\n", (err) => {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        //console.log("message written");
      });
    }, 1500);
    myport.write("hello from node \n", (err) => {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
      //console.log("message written");
    });
  })
  .catch((err) => {
    console.log(`Error communicating with Arduino `, err);
  });

/*
  BASE TEST DATA TO TEST FRONT END 
*/

let data = {
  boost: Math.random() * 36,
  oilTurbo: Math.random() * 115,
  oilPressure: Math.random() * 115,
  oilTurbo: Math.random() * 115,
};

// Static Files
app.use(express.static("public"));

/*
  GET ENDPOINTS
*/
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
  res.hea;
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
