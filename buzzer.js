const gpio = require('wiring-pi');
const BUZZER = 25;
const LED = 29;

const TurnOnLed = function(){
  gpio.digitalWrite(BUZZER,0);
  gpio.digitalWrite(LED,1);
  setTimeout(TurnOnBuzzer,1000);
  console.log("nodejs : LED on, BUZZER off");
}

const TurnOnBuzzer = function(){
  gpio.digitalWrite(LED,0);
  gpio.digitalWrite(BUZZER,1);
  console.log("nodejs: LED off, BUZZER on");
  setTimeout(TurnOnLed,200);
}

process.on('SIGINT',function(){
  gpio.digitalWrite(LED,0);
  gpio.digitalWrite(BUZZER,0);
  console.log("Program Exit");
  process.Exit();
});

gpio.wiringPiSetup();
gpio.pinMode(BUZZER,gpio.OUTPUT);
gpio.pinMode(LED,gpio.OUTPUT);
setTimeout(TurnOnLed,200);
