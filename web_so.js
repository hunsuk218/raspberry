const http = require('http'), gpio = require('wiring-pi');
const fs = require('fs');
const socketio = require('socket.io');
const LEDRED = 29, LEDBLUE = 28, LEDGREEN = 25;
const TRIG = 26, ECHO = 27;
var startTime, travelTime;
var index = 0, value = [];
var timerid, timeout = 800; // 타이머제어용
var cnt = 1; // 타이머 제어용
const server = http.createServer(function(request, response) {
  fs.readFile('views/web_so.html', 'utf8', function(error, data) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(data);
  });
}).listen(65001, function() {
  gpio.wiringPiSetup();
  gpio.pinMode(LEDBLUE, gpio.OUTPUT);
  gpio.pinMode(LEDRED, gpio.OUTPUT);
  gpio.pinMode(LEDGREEN, gpio.OUTPUT);
  gpio.pinMode(ECHO, gpio.INPUT);
  gpio.pinMode(TRIG, gpio.OUTPUT);
  gpio.digitalWrite(LEDRED, 0); // LED초기화
  gpio.digitalWrite(LEDBLUE, 0); // LED초기화
  gpio.digitalWrite(LEDGREEN, 0); // LED초기화
  console.log('Server running at http://IP주소:65001');
});
const io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
  socket.on('startmsg', function(data) {
    console.log('가동메시지 수신(측정주기:%d)!', data);
    timeout = data;
    watchon(); // 타이머가동(초음파가동)
  });
  socket.on('stopmsg', function(data) {
    console.log('중지메시자 수신!');
    clearTimeout(timerid);
  });
});

const watchon = () => {
  gpio.digitalWrite(TRIG, gpio.LOW);
  gpio.delayMicroseconds(2)
  gpio.digitalWrite(TRIG, gpio.HIGH);
  gpio.delayMicroseconds(20)
  gpio.digitalWrite(TRIG, gpio.LOW);
  while (gpio.digitalRead(ECHO) == gpio.LOW);
  startTime = gpio.micros();
  while (gpio.digitalRead(ECHO) == gpio.HIGH);
  travelTime = gpio.micros() - startTime;
  distance = travelTime / 58;
  if (distance < 400) { // 센서는 400 cm 이내만 측정가능 함
    if(distance <10){
      gpio.digitalWrite(LEDGREEN,0);
      gpio.digitalWrite(LEDBLUE,0);
      gpio.digitalWrite(LEDRED,1);
    }
    else if(distance >=10 & distance<50){
      gpio.digitalWrite(LEDGREEN,0);
      gpio.digitalWrite(LEDBLUE,1);
      gpio.digitalWrite(LEDRED,0);
    }
    else if(distance >= 50){
      gpio.digitalWrite(LEDGREEN,1);
      gpio.digitalWrite(LEDBLUE,0);
      gpio.digitalWrite(LEDRED,0);
    }


    if (index < 500) {
      value[index++] = distance;
      console.log('근접거리: %d cm', value[index - 1]);
      io.sockets.emit('watch', value[index - 1]);
    } else index = 0;
  }
  timerid = setTimeout(watchon, timeout);
}
