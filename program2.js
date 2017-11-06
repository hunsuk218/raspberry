/*
p#6 GND
p#2 5V
p#37 BTN wpi = 25
p#40 LED wpi = 29
*/

const gpio = require('wiring-pi');
const BTN = 25;
const LED = 29;
var count = 0;

const pressBtn = function(){
  let data = gpio.digitalRead(BTN);
  if(!data){
    if(count == 0){
      gpio.digitalWrite(LED,1);
      count = 1;
    }
    else{
      gpio.digitalWrite(LED,0);
      count = 0;
    }
  }
  setTimeout(pressBtn,200);
}

process.on('SIGINT',function(){
  gpio.digitalWrite(LED,0);
  process.exit();
})

gpio.wiringPiSetup();
gpio.pinMode(BTN,gpio.INPUT);
gpio.pinMode(LED,gpio.OUTPUT);
setImmediate(pressBtn);
