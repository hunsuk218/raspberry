const gpio = require('wiring-pi');
const SOUND = 29;
const BLUELED = 7;

const DetectSound = function(){
  gpio.digitalWrite(BLUELED,1);
  gpio.delay(10);
  gpio.digitalWrite(BLUELED,0);
}

process.on('SIGINT',function(){
  gpio.digitalWrite(BLUELED,0);
  console.log("program EXIT");
  process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(SOUND,gpio.INPUT);
gpio.pinMode(BLUELED,gpio.OUTPUT);
console.log("이벤트 방식: 소리 탐지중");
gpio.wiringPiISR(SOUND,gpio.INT_EDGE_RISING,DetectSound);
