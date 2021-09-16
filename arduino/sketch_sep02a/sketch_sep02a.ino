float vin;
float analogVoltage;
float averageAnalogVoltage;
float resistorKnown;
float resistorUnknown;
float buff;
float temp;
float psi;
const int loopCount = 6;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
   String s = "";
while(Serial.available() > 0) {
 String s = Serial.readStringUntil('\n');

  }
 Serial.println(s);
}

float readOilPres(){
   averageAnalogVoltage = 0;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A0);
     averageAnalogVoltage = averageAnalogVoltage + analogVoltage;
     delay(2.5);
   }
   vin = (5 * (averageAnalogVoltage/loopCount) / 1024.0);
   psi = (75/2) * vin - (75/4)- .45;
   if(psi < 0){
    return 0.0;
   }else if (psi <0.1){
    return 0.1;
   }
  return psi;
}
float readBoost(){
   averageAnalogVoltage = 0;
   for (int i = 0; i < 100; i++){
     analogVoltage = analogRead(A1);
     averageAnalogVoltage = averageAnalogVoltage + analogVoltage;
     delay(2.5);
   }
   vin = (5 * (averageAnalogVoltage/loopCount) / 1024.0);
   psi = (75/2) * vin - (75/4)- .45;
   if(psi <0.1 && psi > -0.1){
    return 0.0;
   }
  return psi;
}

float readOilTemp(){
   averageAnalogVoltage = 0;
   resistorKnown = 467;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A2);
     averageAnalogVoltage = averageAnalogVoltage + analogVoltage;
      delay(2.5);
   }
   vin = (5.0 * (averageAnalogVoltage/loopCount) / 1024.0);
   buff = vin / (5.0 - vin);
   resistorUnknown = (5-vin) / (vin / resistorKnown);
   // two graphs for temps >50 and 50> with multipler of .81 to resistance since sensor reads high 
   if (resistorUnknown > 570){
      temp = 272 + (-35.8 * log(resistorUnknown * .81));
   }else{
     temp = 200 + (-23.7 * log(resistorUnknown * .81));
   }
  return temp;
}

float readOilTemp1(){
   averageAnalogVoltage = 0;
   resistorKnown = 467;
   for (int i = 0; i < loopCount; i++){
     analogVoltage = analogRead(A3);
     averageAnalogVoltage = averageAnalogVoltage + analogVoltage;
     delay(2.5);
   }
   vin = (5.0 * (averageAnalogVoltage/loopCount) / 1024.0);
   buff = vin / (5.0 - vin);
   resistorUnknown = (5-vin) / (vin / resistorKnown);
   temp = 254 + (-32 * log(resistorUnknown));
  return temp;
}
