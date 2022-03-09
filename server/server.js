import express from "express";
import cors from "cors";
import Arduino from "./js/arduino.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const text = fs.readFileSync("./data/RyanHuga_drive.csv", "utf8");
const arr = csvToArray(text);
let currentData = arr[0];

let i = 0;
setInterval(() => {
  currentData = arr[i];
  i++;
  if (i === 169) i = 0;
}, 65);

let data = {
  boost: 0,
  oilTemp: 0,
  oilPressure: 0,
};

const PORT = 3000;
const app = express();
app.use(cors());

app.get("/data", function (_, res) {
  const data = {
    boost: +currentData.Boost,
    oilTemp: oilTemp,
    oilPressure: oilPressure,
    afCorrection: +currentData.AFCorrection,
    afLearning: +currentData.AFLearning,
    afr: +currentData.AFR,
    load: +currentData.LOAD,
    rpm: +currentData.RPM,
    knock: +currentData.Knock,
    fineLearnKnock: +currentData.FineLearnKnock,
    iam: +currentData.IAM,
    ignitionTotalTiming: +currentData.IgnitionTotalTiming,
    idc: +currentData.IDC,
    ait: +currentData.AIT,
    maf: +currentData.MAF,
  };
  res.send(JSON.stringify(data));
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));

// temp try catch
try {
  const arduino = new Arduino();
  setInterval(() => {
    const val = arduino.writeData().readData();
    if (!val) return;
    data = val;
  }, 15000);
} catch (error) {
  console.log(error);
}

let boost = 0;
let oilTemp = -40;
let oilPressure = 15;
setInterval(() => {
  oilPressure += 1.221;
  oilTemp += 1.242;
  boost += 1.246;

  if (oilPressure > 150) oilPressure = 15;
  if (oilTemp > 150) oilTemp = -40;
  if (boost > 50) boost = 0;
}, 150);

// copy pasted code to use a csv file to emulate data from ECU
function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}
