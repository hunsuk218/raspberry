/*
p#2 5V
p#6 GND
p#37 25 BUZZER
p#36 27 LEDRED
p#38 28 LEDBLUE
p#40 29 LEDGREEN
p#35 24 BTN
p#32 26 LIGHTSENSOR
*/

const gpio = require('wiring-pi');
const LEDRED = 27;
const LEDBLUE = 28;
const LEDGREEN = 29;

const BTN = 24;
const LIGHTSENSOR = 26;
const BUZZER = 25;

const ledOn = function(){
  gpio.digitalWrite(LEDRED,1);
  gpio.digitalWrite(LEDBLUE,1);
  gpio.digitalWrite(LEDGREEN,1);
}

const ledOff = function(){
  gpio.digitalWirte(LEDRED,0);
  gpio.digitalWirte(LEDBLUE,0);
  gpio.digitalWirte(LEDGREEN,0);
}

const buzzerOn = function(){
  gpio.digitalWrite(BUZZER,1);

  setTimeout(function(){
    digitalWrite(BUZZER,0);
  },500);
}

const pressBtn = function(){
  let data = gpio.digitalRead(BUTTON);

  if(!data){
    lightSensorOn();
  }
  setTimeout(pressBtn,200);
}

const lightSensorOn = function(){
  let data = gpio.digitalRead(LIGHTSENSOR);
  if(data){
    ledOn();
  }
  else{
    ledOff();
  }
  setTimeout(lightSensorOn,200);
}

process.on('SIGINT',function(){
  ledOff();
  gpio.digitalWrite(BUZZER,0);
  process.exit();
})

gpio.wiringPiSetup();
gpio.pinMode(LEDRED,gpio.OUTPUT);
gpio.pinMode(LEDBLUE,gpio.OUTPUT);
gpio.pinMode(LEDGREEN,gpio.OUTPUT);

gpio.pinMode(BUTTON,gpio.INPUT);
gpio.pinMode(LIGHTSENSOR,gpio.INPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);

setImmediate(pressBtn);
