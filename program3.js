/*
p#2 5V
p#6 GND
p#37 25 BUZZER
p#36 27 BLUELED
p#38 28 REDLED
p#40 29 GREENLED
p#35 24 BTN
*/

const gpio = require('wiring-pi');
const BUZZER = 25;
const BLUELED = 27;
const REDLED = 28;
const GREENLED = 29;
const BTN = 24;

var count = 0;

const buzzerOn = function(){
  gpio.digitalWrite(BUZZER,1);
  setTimeout(function(){
    gpio.digitalWrite(BUZZER,0);
  },500);
}

const pressBtn = function(){
  let data = gpio.digitalRead(BTN);
  if(!data){
    if(count == 0){
      gpio.digitalWrite(GREENLED,0);
      gpio.digitalWrite(BLUELED,1);
      gpio.digitalWrite(REDLED,0);
      buzzerOn();
      count = 1;
    }
    else if(count == 1){
      gpio.digitalWrite(GREENLED,0);
      gpio.digitalWrite(BLUELED,0);
      gpio.digitalWrite(REDLED,1);
      buzzerOn();
      count = 2;
    }
    else {
      gpio.digitalWrite(GREENLED,1);
      gpio.digitalWrite(BLUELED,0);
      gpio.digitalWrite(REDLED,0);
      buzzerOn();
      count = 0;
    }
  }
  setTimeout(pressBtn,200)
}
process.on('SIGINT',function(){
  gpio.digitalWrite(REDLED,0);
  gpio.digitalWrite(GREENLED,0);
  gpio.digitalWrite(BLUELED,0);
  gpio.digitalWrite(BUZZER,0);
  process.exit();
})

gpio.wiringPiSetup();
gpio.pinMode(BTN,gpio.INPUT);
gpio.pinMode(REDLED,gpio.OUTPUT);
gpio.pinMode(BLUELED,gpio.OUTPUT);
gpio.pinMode(GREENLED,gpio.OUTPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);

setImmediate(pressBtn);
