const humitemp = require("node-dht-sensor");
const gpio = require("wiring-pi");
const RELAY = 29;
const htsensor = {
  sensors: [
    {
      name: "Outdoor(White)",
      type: 22,
      pin: 16
    }
  ],
  read: function() {

    let result;
      result = humitemp.read(this.sensors[0].type, this.sensors[0].pin);
      console.log(this.sensors[0].name + ": " +
        result.temperature.toFixed(1) + "°C, " +
        result.humidity.toFixed(1) + "%");

        if(count == 0){
        data = result.temperature.toFixed(1);
        console.log(data+"CHECK!!");
      }

    if((result.temperature.toFixed(1) - data ) >1){
      console.log("RELAY ON!!");
        gpio.digitalWrite(RELAY,HIGH);
    }
    else if((data - result.temperature.toFixed(1) ) > 1){
      console.log("RELAY OFF!!");
      gpio.digitalWrite(RELAY,LOW);
    }
    count += 1;

    setTimeout(function() {
      htsensor.read();
    }, 2500); // 최소 2초이상 주기
  }

};
var data;
var count =0;
gpio.pinMode(RELAY,gpio.OUTPUT);
htsensor.read();
