const gpio = require('wiring-pi'), ejs = require('ejs');
const express = require('express'), fs = require('fs');
const app = express();

const BUZZER = 24, LEDRED = 28, LEDGREEN = 29, LEDBLUE = 27, LIGHTSENSOR = 26;

var timerid, index,value = [];
var led1state = '#b0b0b0';
var buzzerstate = '#b0b0b0';
var lightstate = '#b0b0b0';

//Test중입니다........

app.get('/',(req,res) => {
  fs.readFile('views/contpage.ejs','utf-8',(error,data) => {
    if(error)
    res.send(500);
    else
        res.send(ejs.render(data,{
        led1color :led1state,
        buzzercolor : buzzerstate,
        lightcolor:lightstate}));
    });
  });

app.listen(60001,()=>{
  gpio.wiringPiSetup();
  gpio.pinMode(BUZZER,gpio.OUTPUT);
  gpio.pinMode(LEDRED,gpio.OUTPUT);
  gpio.pinMode(LEDGREEN,gpio.OUTPUT);
  gpio.pinMode(LEDBLUE,gpio.OUTPUT);
  gpio.pinMode(LIGHTSENSOR,gpio.INPUT);
});

app.get('/led1/1',(req,res) =>{
  console.log("LED를 ON시킵니다");
  gpio.digitalWrite(LEDBLUE,1);
  led1state = '#0000ff';
  res.redirect('/');
});

app.get('/led1/0',(req,res) => {
  console.log("LED를 OFF시킵니다.");
  gpio.digitalWrite(LEDBLUE,0);
  led1state = '#b0b0b0';
  res.redirect('/');
});

app.get('/buzzer/1',(req,res) =>{
  console.log("부져를 켭니다");
  gpio.digitalWrite(BUZZER,1);
  buzzerstate = '#0000ff';
  res.redirect('/');
});


app.get('/buzzer/0',(req,res) =>{
  console.log("부져를 끕니다");
  gpio.digitalWrite(BUZZER,0);
  buzzerstate = '#b0b0b0';
  res.redirect('/');
});

const lightctl = () =>{
  if(index < 500){
    value[index++] = gpio.digitalRead(LIGHTSENSOR);
    console.log('value:' + value[index-1]);
  }
  else {
    index = 0;
  }
  timerid = setTimeout(lightctl,1000);
}


app.get('/light/1',(req,res) =>{
  console.log("광센서로 측정을 시작합니다...");
  timerid = setTimeout(lightctl,100);
  lightstate = '#0000ff';
  res.redirect('/');
});

app.get('/light/2',(req,res) =>{
  console.log("그동안 측정된 값들을 보여줍니다...");
  fs.readFile('views/lightdata.ejs','utf-8',(error,data)=>{
    if(error) res.send(500);
    else res.send(ejs.render(data,{lightdata:value}));
  });
});

app.get('/light/0',(req,res) => {
  console.log("광센서의 측정을 중지하였습니다...");
  clearTimeout(timerid);
  lightstate = '#a0a0a0';
  res.redirect('/');
});

app.get('/led3/01',(req,res) =>{
  console.log("REDLED를 ON시킵니다");
  gpio.digitalWrite(LEDRED,1);
  led1state = '#0000ff';
  res.redirect('/');
});

app.get('/led3/00',(req,res) => {
  console.log("REDLED를 OFF시킵니다.");
  gpio.digitalWrite(LEDRED,0);
  led1state = '#b0b0b0';
  res.redirect('/');
});

app.get('/led3/11',(req,res) =>{
  console.log("GREENLED를 ON시킵니다");
  gpio.digitalWrite(LEDGREEN,1);
  led1state = '#0000ff';
  res.redirect('/');
});

app.get('/led3/10',(req,res) => {
  console.log("GREENLED를 OFF시킵니다.");
  gpio.digitalWrite(LEDGREEN,0);
  led1state = '#b0b0b0';
  res.redirect('/');
});

app.get('/led3/21',(req,res) =>{
  console.log("BLUELED를 ON시킵니다");
  gpio.digitalWrite(LEDBLUE,1);
  led1state = '#0000ff';
  res.redirect('/');
});

app.get('/led3/20',(req,res) => {
  console.log("BLELED를 OFF시킵니다.");
  gpio.digitalWrite(LEDBLUE,0);
  led1state = '#b0b0b0';
  res.redirect('/');
});
