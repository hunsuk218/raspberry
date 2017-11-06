    const gpio = require('wiring-pi');

    const BUTTON = 24;
    const LIGHTSENSOR = 26;
    const TOUCH = 23;

    const LED = 4;
    const RED = 27;
    const BLUE = 28;
    const GREEN = 29;
    const RELAY = 22;
    const BUZZER = 25;

    var count = 0;
    var lightStatus = -1;
    var lightInterval;

    const CheckTouch = function() {
      let data = gpio.digitalRead(TOUCH);
      if (data) {
        console.log("TOUCHED");
        gpio.digitalWrite(LED, 1);
        setTimeout(led1off, 200);
      }
      setTimeout(CheckTouch, 200);
    }

    const led1off = function() {
      gpio.digitalWrite(LED, 0);
    }
    const buzzerOn = function() {
      gpio.digitalWrite(BUZZER, 1);
      console.log("BUZZER ON!!");
      setTimeout(function() {
        gpio.digitalWrite(BUZZER, 0);
        console.log("BUZZER OFF!!");
      }, 100);
    }

    const ledOn = function() {
      gpio.digitalWrite(RED, 1);
      gpio.digitalWrite(BLUE, 1);
      gpio.digitalWrite(GREEN, 1);
      console.log("LED ON!!");
    }

    const ledOff = function() {
      gpio.digitalWrite(RED, 0);
      gpio.digitalWrite(BLUE, 0);
      gpio.digitalWrite(GREEN, 0);
      console.log("LED OFF!!");
    }

    const pressBtn = function() {
      let data = gpio.digitalRead(BUTTON);
      if (!data) {
        if (count == 0) {
          buzzerOn();
          ledOn();
          lightInterval = setInterval(lightSensor, 100);
          count = 1;
        } else if (count == 1) {
          buzzerOn();
          ledOff();
          clearInterval(lightInterval);
          count = 1;
        }
      }
      setTimeout(pressBtn, 200);
    }
    const lightSensor = function() {
      let data = gpio.digitalRead(LIGHTSENSOR);
      if (data != lightStatus) {
        console.loog(data);
        console.log("LIGHT");
        if (data == 1) {
          console.log("RELAY ON");
          gpio.digitalWrite(RELAY, gpio.HIGH);
        } else if(data == 0){
          console.log("RELAY OFF");
          gpio.digitalWrite(RELAY, gpio.LOW);
        }
        lightStatus = data;
      }
    }

    process.on('SIGINT', function() {
      ledOff();
      gpio.digitalWrite(BUZZER, 0);
      gpio.digitalWrite(RELAY, gpio.LOW);
      gpio.digitalWrite(LED, 0);
      process.exit();
    })

    gpio.wiringPiSetup();
    gpio.pinMode(BUTTON, gpio.INPUT);
    gpio.pinMode(LIGHTSENSOR, gpio.INPUT);
    gpio.pinMode(TOUCH, gpio.INPUT);
    gpio.pinMode(LED, gpio.OUTPUT);
    gpio.pinMode(RED, gpio.OUTPUT);
    gpio.pinMode(BLUE, gpio.OUTPUT);
    gpio.pinMode(GREEN, gpio.OUTPUT);
    gpio.pinMode(RELAY, gpio.OUTPUT);
    gpio.pinMode(BUZZER, gpio.OUTPUT);
    setImmediate(pressBtn);
    setImmediate(CheckTouch);
