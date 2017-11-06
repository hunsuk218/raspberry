/*
p#2       5V
p#6       GND
p#35  24  BTN
p#32  26  LIGHTSENSOR
p#33  23  TOUCHSENSOR
p#16  4   LED
p#37  25  BUZZER
p#38  27  LEDRED
p#39  28  LEDBLUE
p#40  29  LEDGREEN
p#31  22  RELAY
*/

const gpio = require('wiring-pi');

const BTN = 24;
const LIGHTSENSOR = 26;
const TOUCH = 23;

const LED = 4;
const RED = 27;
const BLUE = 28;
const GREEN = 29;
const RELAY = 22;
const BUZZER = 25;

var count = 0;
var status = -1;

const ledOn = function() {
  gpio.digitalWrite(LEDRED, 1);
  gpio.digitalWrite(LEDBLUE, 1);
  gpio.digitalWrite(LEDGREEN, 1);
}

const ledOff = function() {
  gpio.digitalWirte(LEDRED, 0);
  gpio.digitalWirte(LEDBLUE, 0);
  gpio.digitalWirte(LEDGREEN, 0);
}

const buzzerOn = function() {
  gpio.digitalWrite(BUZZER, 1);

  setTimeout(function() {
    digitalWrite(BUZZER, 0);
  }, 500);
}

const touchSensor = function() {
  let data = gpio.digitalRead(TOUCH);

  if (!data) {
    gpio.digitalWrite(LED, 1);
    setTimeout(function() {
      gpio.digitalWrite(LED, 0);
    }, 200);
  }

  setTimeout(touchSensor, 200);
}
const pressBtn = function() {
  let data = gpio.digitalRead(BTN);

  if (!data) {
    if (count == 0) {
      buzzerOn();
      ledOn();
      status = gpio.digitalRead(LIGHTSENSOR);
      const lightInter = setInterval(light,200);
      count = 1;
    } else {
      buzzerOn();
      ledOff();
      clearInterval(lightInter);
      count = 0
    }
  }
  setTimeout(pressBtn,200);
}

const light = function(){
  let data = gpio.digitalRead(LIGHTSENSOR);

  if(data == status && data == 1){
    gpio.digitalWrite(RELAY,HIGH);
  }
  else if(data == status && data == 0){
    gpio.digitalWrite(RELAY,LOW);
  }

  status = data;
}

process.on('SIGINT',function(){
  ledOff();
  gpio.digitalWrite(BUZZER,0);
  gpio.digitalWrite(RELAY,gpio.LOW);
  gpio.digitalWrite(LED,0);
})

gpio.wiringPiSetup();
gpio.pinMode(BTN,gpio.INPUT);
gpio.pinMode(LIGHTSENSOR,gpio.INPUT);
gpio.pinMode(TOUCH,gpio.INPUT);
gpio.pinMode(LED,gpio.OUTPUT);
gpio.pinMode(RED,gpio.OUTPUT);
gpio.pinMode(BLUE,gpio.OUTPUT);
gpio.pinMode(GREEN,gpio.OUTPUT);
gpio.pinMode(RELAY,gpio.OUTPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);
setImmediate(pressBtn);
setImmediate(touchSensor);
