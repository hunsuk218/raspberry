const gpio = require('wiring-pi');

const LEDRED = 27;
const LEDBLUE = 28;
const LEDGREEN = 29;

const BUZZER = 25;
const LIGHTSENSOR = 26;
const BUTTON = 24;

var status = false;

const ledOn = function() {
  gpio.digitalWrite(LEDRED,1);
  gpio.digitalWrite(LEDBLUE,1);
  gpio.digitalWrite(LEDGREEN,1);
  console.log("LED ON!!");
}

const ledOff = function() {
  gpio.digitalWrite(LEDRED,0);
  gpio.digitalWrite(LEDBLUE,0);
  gpio.digitalWrite(LEDGREEN,0);
  console.log("LED OFF!!");
}

const buzzerOn = function() {
  gpio.digitalWrite(BUZZER, 1);
  console.log("BUZZER ON!!");
  setTimeout(function() {
    gpio.digitalWrite(BUZZER, 0);
    console.log("BUZZER OFF!!");
  }, 200);
}

const checkLight = function() {
  let data = gpio.digitalRead(LIGHTSENSOR);
  if (data) {
    console.log("status: Dark");
    ledOn();
  } else {
    console.log("status: Light");
    ledOff();
  }
  setTimeout(checkLight,200);
}

/*
checkLight 함수를 종료시키는 방법
status 변수를 이용해서 함수 실행할 때 마다 한번식 검사
버튼 누릴때마다 true, false;;

*/

const pressBtn = function() {
  let data = gpio.digitalRead(BUTTON);
  if (!data) {
    buzzerOn();
    setImmediate(checkLight);
  }
  setTimeout(pressBtn,200);
}

process.on('SIGINT',function(){
  ledOff();
  gpio.digitalWrite(BUZZER,0);
  process.exit();
})

gpio.wiringPiSetup()
gpio.pinMode(LIGHTSENSOR,gpio.INPUT);
gpio.pinMode(BUTTON,gpio.INPUT);
gpio.pinMode(LEDRED,gpio.OUTPUT);
gpio.pinMode(LEDBLUE,gpio.OUTPUT);
gpio.pinMode(LEDGREEN,gpio.OUTPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);
setImmediate(pressBtn);
