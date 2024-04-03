/*
Serial communitaion with Arduino 
by Yeseul for Physical Computing, 2022

This is a boiler plate for using webserial.
Duplicat this sketch and start adding your code to "CUSTOMIZE" part 
to make your serial communication project to use with your Arduino sketch.


The serial communication part is based on 
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-webserial-input-to-p5-js/
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();

// port chooser button:
let portButton;
let sensor1 = 0
let sensor2 = 0

// CUSTOMIZE: change/add variable for incoming serial data:
let inData;

function setup() {
   // check to see if serial is available:
   if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  } else {
    alert("WebSerial is supported. Enjoy!");
  }
  // check to see if serial is available:
   if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton)
 
  // add serial connect/disconnect listeners from WebSerial API:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  createCanvas(400, 300);
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton('choose port');
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 
// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  let options = { baudrate: 9600}; 
  serial.open().then(initiateSerial);
 
  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):
function serialEvent() {
  
  // CUSTOMIZE: add your code for receiving/sending data over serial  
  let stringFromSerial = serial.readLine()
  if (stringFromSerial != null) {
    let value_array = stringFromSerial.trim().split(',')
    //console.log(value_array)
    sensor1 = int(value_array[0])
    sensor2 = int(value_array[1])
  }
  
}
 
// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}


function draw() {
  background(220);
  // CUSTOMIZE: add your code for receiving/sending data over serial  
  ellipse(sensor1, sensor2, 5)
}

