const gpio=require('wiring-pi')
const LED = 4;
const RED_LED = 27;
const BLUE_LED = 28;
const GREEN_LED = 29;
const BUZZER = 25;
const RELAY = 22;
const BUTTON = 24;
const LIGHT = 26;
const TOUCH = 23;
const SOUND = 21;
var count = 0;

const CheckTouch = function(){
   let data = gpio.digitalRead(TOUCH);
   if(data){
      console.log("TOUCHED");
      LedOn();
            }
   setTimeout(Checktouch,10);
}

const LedOn = function(){
   gpio.digitalWrite(LED,1);
   setTimeout(LedOff,200);
}

const LedOff = function(){
   gpio.digitalWrite(LED,0);
}

const ClickBtn = function(){
   let data = gpio.digitalRead(BUTTON);
   if(!data){
      if(count==0){
         console.log("CLICKED");
         BuzzerOn();
         gpio.digitalWrite(RED_LED,1);
         gpio.digitalWrite(BLUE_LED,1);
         gpio.digitalWrite(GREEN_LED,1);
         CheckLight();
         count =1;
            }
      else if(count==1){
            console.log("CLICKED");
            BuzzerOn();
            gpio.digitalWrite(RED_LED,0);
            gpio.digitalWrite(BLUE_LED,0);
            gpio.digitalWrite(GREEN_LED,0);
            count=0;
   }
}   setTimeout(ClickBtn,200);

}

const CheckLight = function(){
   let data = gpio.digitalRead(LIGHT);
   if(data){
      gpio.digitalWrite(RELAY,gpio.HIGH);
      console.log("RELAY ON");
            }
   else{
      gpio.digitalWrite(RELAY,gpio.LOW);
      console.log("RELAY OFF");
        }
}

const BuzzerOn = function(){
   gpio.digitalWrite(BUZZER,1);
   setTimeout(BuzzerOff,100);
}

const BuzzerOff = function(){
   gpio.digitalWrite(BUZZER,0);
}

process.on('SIGINT', function(){
   gpio.digitalWrite(RED_LED,0);
   gpio.digitalWrite(BLUE_LED,0);
   gpio.digitalWrite(GREEN_LED,0);
   gpio.digitalWrite(BUZZER,0);
   gpio.digitalWrite(RELAY,gpio.LOW);
   console.log("Exit...");
   process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(BLUE_LED,gpio.OUTPUT);
gpio.pinMode(RED_LED,gpio.OUTPUT);
gpio.pinMode(GREEN_LED,gpio.OUTPUT);
gpio.pinMode(BUTTON,gpio.INPUT);
gpio.pinMode(BUZZER,gpio.OUTPUT);
gpio.pinMode(LIGHT,gpio.INPUT);
gpio.pinMode(RELAY,gpio.OUTPUT);
gpio.pinMode(TOUCH,gpio.INPUT);
gpio.pinMode(SOUND,gpio.INPUT);
setImmediate(CheckTouch);
setImmediate(ClickBtn);
