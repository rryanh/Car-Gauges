const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const serialport = require("serialport");
const readline = require("@serialport/parser-readline");
const app = express();
const port = 5000;
const router = express.Router();

const findArduino = async function () {
  return serialport
    .list()
    .then((ports) => {
      for (const port of ports) {
        if (port.productId == 7523) {
          console.log(`Arduino device connected`);
          return port.path;
        }
      }
    })
    .catch((err) => {
      console.log("ERROR: failed on finding Arduino ", err);
    });
};

module.exports = {
  getArduinoPort: function () {
    return findArduino()
      .then((result) => {
        const myport = new serialport(result, { baudRate: 9600 });
        return myport;
      })
      .catch((err) => {
        console.log(`ERROR: most likely cause by no arduino device found`);
        return null;
      });
  },
};
