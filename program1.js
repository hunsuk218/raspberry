/*
GND p#6
LED p#16  wpi 4
LED3 p#40  wpi 29
*/

const gpio = require('wiring-pi');
const LED1 = 4;
const LED2 = 29;
var count = 0;

const run = function(){
  if(count == 0){
    gpio.digitalWrite(LED1,1);
    gpio.digitalWrite(LED2,0);
    count = 1;
  }
  else{
    gpio.digitalWrite(LED1,0);
    gpio.digitalWrite(LED2,1);
    count = 0;
  }
  setTimeout(run,1000);
}

gpio.wiringPiSetup();
gpio.pinMode(LED1,gpio.OUTPUT);
gpio.pinMode(LED2,gpio.OUTPUT);
setImmediate(run);
