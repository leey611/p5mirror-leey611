// Module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var textBlocks = [];
var ground;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  
  var options = {
    isStatic: true
  }
  noStroke()
  // stroke(255);
  //strokeWeight(5);
  ground = Bodies.rectangle(400, height, width, 10, options);
  World.add(world, ground);
}

function mouseDragged() {
  if (frameCount%5===0) {  
    var randomMessage = getRandomErrorMessage();
    var textW = textWidth(randomMessage)
    var x = mouseX;
    var y = mouseY;
    var options = {
      restitution: 0.6,
      friction: 0.1
    };
    textBlocks.push(new TextBlock(x, y, randomMessage, options,textW));
  }
}

function draw() {
  background(150);
  textBlocks = textBlocks.filter(block => block.inCanvas())
  for (var i = 0; i < textBlocks.length; i++) {
      textBlocks[i].show();
  }
  
  stroke(255);
  textFont('Courier New');
  // strokeWeight(5);
  rectMode(CENTER);
  rect(400, height+5, width, 10);
}

function keyTyped() {
	if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'jpg');
  }
  return false;
}

// Function to get a random error message
function getRandomErrorMessage() {
  var errorMessages = [
    "Error 404: Brain not found.",
  "Unexpected kangaroo in your code.",
  "System error: Insufficient chocolate.",
  "Error: Alien invasion detected.",
  "404 Error: Reality not found.",
  "Oops! Gravity malfunction.",
  "Error: Cat walked over keyboard.",
  "System failure: Too much glitter.",
  "Error: Coffee break interrupted.",
  "Error 101: Squirrel on power line.",
  "Error: Unicorn ran out of magic.",
  "System error: Potato battery drained.",
  "Error: Ghost in the machine.",
  "404 Error: Destiny not found.",
  "Oops! Parallel universe glitch.",
  "Error: Monkey business detected.",
  "System failure: Disco overload.",
  "Error: Quantum flux capacitor overheated.",
  "Error: Butterfly effect in progress."
  ];
  
  return random(errorMessages);
}

// TextBlock class
class TextBlock {
  constructor(x, y, message, options, w) {
    this.body = Bodies.rectangle(x, y, w, 40, options);
    this.message = message;
    this.world = world;
    
    // Function to get a random color
    this.getRandomColor = function() {
      return color(random(255), random(255), random(255));
    }
    try {
      throw new Error(this.message);
    } catch (error) {
      console.error(error.message);
    }
    World.add(this.world, this.body);
  }
  inCanvas() {
    var pos = this.body.position;
    return pos.x > 0 && pos.x < width && pos.y > 0 && pos.y < height
  }
  show() {
    var pos = this.body.position;
    var angle = this.body.angle;
    textSize(20);
    // push()
    // translate(pos.x, pos.y)
    // rectMode(CENTER);
    // rotate(angle);
    // fill('red')
    // rect(0, 0, textWidth(this.message),40)
    // pop()
    
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    textAlign(CENTER, CENTER);
    // Assign a random color to the text
    fill(this.getRandomColor());
    text(this.message, 0, 0);
    pop();
  }
}
