/*
		Serial input in ASCII example
    Reads a serial input line, terminated by a newline, using serial.readLine()
    
    To be used with the Arduino AnalogReadSerial example 
    (Arduino File Menu -> Examples -> Basics -> AnalogReadSerial)
    created 9 Oct 2017
    by Tom Igoe
*/
var serial; // variable to hold an instance of the serialport library
var portName = 'COM4'; // fill in your serial port name here
var circleSize = 10; // size of the circle
var xPos = 0;
var yPos = 0;

function setup() {
  createCanvas(800, 600);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function draw() {
  background("#2277A3");			// set the background color
  fill("#55CAFE");						// set the circle fill color
  noStroke();									// don't use a stroke around the circle
  // draw the circle:
  ellipse(width/2, height/2, circleSize, circleSize);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  var data = serial.readLine();
  //circleSize = int(data);
  //console.log('data',data)
  if (data.length > 0) {
   // console.log(data);
    var sensors = split(data, ",");
    //console.log(sensors);
    xPos = int(sensors[0]);
    yPos = int(sensors[1]);
    
    circleSize = int(data);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}