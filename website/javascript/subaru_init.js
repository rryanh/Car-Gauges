"use strict";
const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const router = express.Router();
const serialport = require("serialport");
const readline = require("@serialport/parser-readline");

module.exports = {
  OBDport: function (func) {
    func
      .then((result) => {
        const myport = new serialport(result, {
          baudRate: 4800,
          dataBits: 8,
          parity: "none",
          stopBits: 1,
        });
        return myport;
      })
      .catch((err) => {});
  },
};
