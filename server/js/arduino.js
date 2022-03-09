import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export default class Arduino {
  #parser;
  #arduinoSerialPort;
  #productId;
  #baudRate;
  #data = null;

  /**
   * @param {Number} [productId=7523] productId of arduino
   * @param {Number} [baudRate=9600] baudRate of SerialPort
   */
  constructor(productId = 7523, baudRate = 9600) {
    this.#productId = productId;
    this.#baudRate = baudRate;
    this.#initConnection();
  }

  /**
   * returns latest data from the arduino
   * @returns {Object | null} returns object containing data or null if arduino has not been fully initialized
   */
  readData() {
    return this.#data;
  }

  /**
   * writes newline to arduino to initiate device to read new values;
   * @returns {this} returns this
   */
  writeData() {
    if (!this.#arduinoSerialPort) return this;

    this.#arduinoSerialPort.write("\n", (err) => {
      if (!err) return;
      console.log(Error("issue writing to device"));
    });

    return this;
  }

  /**
   * attempts to create connection to arduino device
   * @return {void}
   */
  async #initConnection() {
    try {
      const { path } = await this.#findArduino();
      this.#arduinoSerialPort = new SerialPort({
        path: path,
        baudRate: this.#baudRate,
      });

      this.#initParser();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * inits parser and defines what to do on data
   */
  #initParser() {
    try {
      this.#parser = this.#arduinoSerialPort.pipe(
        new ReadlineParser({ delimiter: "\n" })
      );

      this.#parser.on("data", (data) => (this.#data = JSON.parse(data)));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * finds what port the arduino is connected to
   * @returns {Promise<SerialPort>}
   */
  async #findArduino() {
    let port;
    try {
      const ports = await SerialPort.list();

      ports.forEach((p) => {
        if (+p.productId === this.#productId) port = p;
      });

      if (port) return port;

      throw Error(`No device matching productId ${this.#productId} was found`);
    } catch (error) {
      throw error;
    }
  }
}
