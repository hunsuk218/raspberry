const gpio = require('wiring-pi');
const mysql = require('mysql');
const TRIG = 9;
const ECHO = 8;

var startTime;
var travelTime;

const client = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'gachon654321',
  database: 'sensordb'
});


const Triggering = function() {
  gpio.digitalWrite(TRIG, gpio.LOW);
  gpio.delayMicroseconds(2);
  gpio.digitalWrite(TRIG, gpio.HIGH);
  gpio.delayMicroseconds(20);
  gpio.digitalWrite(TRIG, gpio.LOW);

  while (gpio.digitalRead(ECHO) == gpio.LOW);

  startTime = gpio.micros();
  while (gpio.digitalRead(ECHO) == gpio.HIGH);
  travelTime = gpio.micros() - startTime;
  distance = travelTime / 58;
  if (distance < 400) {
    console.log("Distance: %d cm", distance);
    if (distance < 20) {
      let stamptime = new Date();
      client.query('INSERT INTO sonic VALUES(?,?)', [stamptime, distance], (err, result) => {
        if (err) {
          console.log("DB저장 실패!");
          console.log(err);
        }
        else console.log("DB저장 완료!");
      });
    }
  }
  setTimeout(Triggering, 700);
}

const  Retrieve = function() {
  let stamp_distance;
  client.query('SELECT * FROM sonic', function (error, results, fields) {
    console.log("----------------------------------------");
    results.forEach(function(element, i) {
      stamp_distance = '';
      stamp_distance  += element.stamp.toLocaleString() + '.';
      stamp_distance  += element.stamp.getMilliseconds() + '  ';
      stamp_distance  += element.distance;     // 거리(distance) 추가
	console.log(stamp_distance);    });
    });
 
setTimeout(Retrieve, 5000);
}

gpio.wiringPiSetup();
gpio.pinMode(TRIG, gpio.OUTPUT);
gpio.pinMode(ECHO, gpio.INPUT);
setImmediate(Triggering);
//;setImmediate(Retrieve);
