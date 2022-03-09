#include <ArduinoJson.h>
#include <Arduino.h>
const int loopCount = 6;
float vin;
float analogVoltage;
float averageAnalogVoltage;
float resistorKnown;
float resistorUnknown;
float buff;
float temp;
float psi;
float oilPsi = 0;
float boostPsi = 0;
float oilTemp = 0;
DynamicJsonDocument doc(1024);

void setup() {
Serial.begin(9600);
}

void loop() {
  while(Serial.available() > 0) {
    Serial.readStringUntil('\n');
    doc["boost"] = boostPsi;
    doc["oilTemp"] = oilTemp;
    doc["oilPressure"] = oilPsi;
    serializeJson(doc, Serial);
    Serial.println();
    oilPsi = readOilPres();
    boostPsi = readBoost();
    oilTemp = readOilTemp();
  }
delay(25);

}

float readOilPres(){
   averageAnalogVoltage = 0;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A0);
     averageAnalogVoltage =+ analogVoltage;
     delay(2.5);
   }
   vin = (5 * (averageAnalogVoltage/loopCount) / 1024.0);
   psi = (75/2) * vin - (75/4)- .45;
   return (psi < 0) ? 0 : psi;
}

float readBoost(){
   averageAnalogVoltage = 0;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A1);
     averageAnalogVoltage =+ analogVoltage;
     delay(2.5);
   }
   vin = (5 * (averageAnalogVoltage/loopCount) / 1024.0);
   psi = (75/2) * vin - (75/4)- .45;
   return (psi <0.1 && psi > -0.1) ? 0 : psi;
}

float readOilTemp(){
   averageAnalogVoltage = 0;
   resistorKnown = 4600;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A2);
     averageAnalogVoltage =+ analogVoltage;
      delay(2.5);
   }
   vin = (5.0 * (averageAnalogVoltage/loopCount) / 1024.0);
   buff = vin / (5.0 - vin);
   resistorUnknown = (5-vin) / (vin / resistorKnown);
   temp = (1 / (1.365647684E-3 + 1.860088937E-4 * log(resistorUnknown) + 3.850551359E-7 * pow((log(resistorUnknown)), 3))) -273.15;
   return temp;
}

// float readSensor(pin){
//     for (int i = 0; i < loopCount; i++){
//      analogVoltage = analogRead(pin);
//      averageAnalogVoltage =+ analogVoltage;
//       delay(2.5);
//    }
// }