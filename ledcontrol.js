const gpio = require('wiring-pi');


const LEDBLUE = 27;
const LEDRED = 28;
const LEDGREEN = 29;
const BUTTON = 24;
const BUZZER = 25;

var count = 0;

const buzzerOn = function(){
  gpio.digitalWrite(BUZZER,1);

  setTimeout(function(){
    gpio.digitalWrite(BUZZER,0);
  },200);
}

const pressBtn = function(){

  if(count == 0){
    gpio.digitalWrite(LEDGREEN,0);
    gpio.digitalWrite(LEDBLUE,1);
    buzzerOn();
  }
}
...

gpio.pinMode(BUZZER,gpio.OUTPUT);
gpio.pinMode(BUTTON,gpio.INPUT);
