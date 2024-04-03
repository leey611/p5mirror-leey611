// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 2;
    this.maxforce = 1;
    
    // this.history = [];
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }
  
  follow(flowfield) {
    let i = floor(this.position.x / w);
    let j = floor(this.position.y / h);
    i = constrain(i,0,cols-1);
    j = constrain(j,0,rows-1);
    let desired = flowfield[i][j].copy();
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  show() {
    fill(0);
    circle(this.position.x, this.position.y, 4);
    // Draw a triangle rotated in the direction of velocity
    // let theta = this.velocity.heading() + PI / 2;
    // fill(127);
    // stroke(0);
    // strokeWeight(2);
    // push();
    // translate(this.position.x, this.position.y);
    // rotate(theta);
    // beginShape();
    // vertex(0, -this.r * 2);
    // vertex(-this.r, this.r * 2);
    // vertex(this.r, this.r * 2);
    // endShape(CLOSE);
    // pop();
  }
}