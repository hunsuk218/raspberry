const gpio = require('wiring-pi');
const LEDRED = 27;
const LEDBLUE = 28;
const LEDGREEN = 29;

const BUZZER = 25;
const TOUCH = 26;
const LIGHT = 24;
var count = 0;
var lightInter;

const touched = function(){

  if(count == 0){

    clearInterval(lightInter);

    gpio.digitalWrite(BUZZER,1);
    setTimeout(function(){
      gpio.digitalWrite(BUZZER,0);
    },50);

    gpio.digitalWrite(LEDGREEN,1);
    count = 1;
  }

  else if(count == 1){
    gpio.digitalWrite(BUZZER,1);
    setTimeout(function(){
      gpio.digitalWrite(BUZZER,0);
    },80);

    gpio.digitalWrite(LEDGREEN,0);
    count = 2;

    lightInter = setInterval(lighted,100);
  }

  else if(count == 2){
    gpio.digitalWrite(BUZZER,1);
    setTimeout(function(){
      gpio.digitalWrite(BUZZER,0);
    },25);

    gpio.delay(50);

    gpio.digitalWrite(BUZZER,1);
    setTimeout(function(){
      gpio.digitalWrite(BUZZER,0);
    },25);

    gpio.digitalWrite(LEDGREEN,0);
    process.exit();

  }
}

const lighted = function(){
  let data = gpio.digitalRead(LIGHT);

  if(data){
    gpio.digitalWrite(LEDRED,1);
  }
  else{
    gpio.digitalWrite(LEDRED,0);
  }

  setTimeout(lighted,200);


}

gpio.wiringPiSetup();
gpio.pinMode(LEDRED,gpio.OUTPUT);
gpio.pinMode(LEDGREEN,gpio.OUTPUT);
gpio.pinMode(LEDBLUE,gpio.OUTPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);

gpio.pinMode(TOUCH,gpio.INPUT);
gpio.pinMode(LIGHT,gpio.INPUT);

gpio.wiringPiISR(TOUCH,gpio.INT_EDGE_RISING,touched);
