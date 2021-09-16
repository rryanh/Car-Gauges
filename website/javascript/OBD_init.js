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
  /*
    TODO: find what port info the ssm OBD adapter has

    FINDS THE OBD ADAPTER
*/
  findOBD: async function () {
    return serialport
      .list()
      .then((ports) => {
        for (const port of ports) {
          for (const port of ports) {
            /*
                TODO: ENTER CORRECT CHINESE K-LINE ODB ADAPTER INSTEAD OF OPENPORT 2.0
              */
            if (port.productId == "CC4D") {
              console.log(`OBD device connected`);
              return port.path;
            }
          }
        }
      })
      .catch((err) => {
        console.log("ERROR: failed on finding OBD ", err);
      });
  },
};
