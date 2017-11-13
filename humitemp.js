const humitemp = require("node-dht-sensor");
const htsensor = {
  sensors: [{
      name: " Indoor(Blue)",
      type: 11,
      pin: 12
    },
    {
      name: "Outdoor(White)",
      type: 22,
      pin: 16
    }
  ],
  read: function() {
    for (let index in this.sensors) {
      let result;
      result = humitemp.read(this.sensors[index].type, this.sensors[index].pin);
      console.log(this.sensors[index].name + ": " +
        result.temperature.toFixed(1) + "°C, " +
        result.humidity.toFixed(1) + "%");
    }
    setTimeout(function() {
      htsensor.read();
    }, 2500); // 최소 2초이상 주기
  }
};
htsensor.read();
