//Amy Liu 
let bubbles = []; 
// bubbles[0]
// bubbles[1]
// bubbles[2]

function setup() {
  createCanvas(600, 400);
  background (200);
  
  for (let i = 0; i < 3; i++) {
    let x = random(width);
    let y = random(height);
    // let x =50;
    // let y =50;
    let r = random(10,40);
    let b = random(100, 255)
        
  bubbles [i] = new Bubble(x, y, r, b);
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX,
                          mouseY,
                          random(10, 40),
                          random(100, 255)))
}

function draw() {               
 background(255, 204, 0);
  for (let i = 0; i <bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
//   bubbles[0].move()
//   bubbles[0].show()
  
//   bubbles[1].move()
//   bubbles[1].show()
  
}

class Bubble {
  constructor(x, y, r, b) {
  this.x= x;
  this.y= y;
  this.r= r;
  this.b = b;
  }

  move() {
    this.x = this.x + random (-5,5);
    this.y = this.y + random(-5,5);}
  
  show(){
    push()
    fill(0, 0, this.b);
    stroke(127, 63, 120);
    translate(this.x, this.y);
    noStroke();
    for (let i = 0; i <10; i ++) {
      ellipse(0, 30, this.r, 50);
      rotate(PI/5);
    } pop()
  }
}

//
