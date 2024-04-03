// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pendulum

// A Simple Pendulum Class

// This constructor could be improved to allow a greater variety of pendulums
class Pendulum {
  constructor(x, y, r) {
    // Fill all variables
    this.pivot = createVector(x, y);
    this.bob = createVector();
    this.r = r;
    this.angle = PI-0.5;

    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.damping = 0.995; // Arbitrary damping
    this.ballr = 24.0; // Arbitrary ball radius
  }

  // Function to update position
  update() {
    // if (mouseIsPressed) {
    //   this.angleAcceleration = map(mouseX, 0, width, -0.001, 0.001);
    // } else {
    //   this.angleAcceleration = 0;
    // }

    // As long as we aren't dragging the pendulum, let it swing!
    if (!this.dragging) {
      let gravity = 0.4; // Arbitrary constant
      this.angleAcceleration = (gravity / this.r) * sin(this.angle); // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)

      this.angleVelocity += this.angleAcceleration; // Increment velocity
      this.angle += this.angleVelocity; // Increment angle
      this.angleVelocity *= this.damping; // Apply some damping
    }
  }

  show() {
    this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
    this.bob.add(this.pivot); // Make sure the position is relative to the pendulum's origin
    
    push();
    translate(this.pivot.x, this.pivot.y - this.r/2);
    rectMode(CENTER);
    rotate(-this.angle);
    square(0, 0, 100);
    pop();

    stroke(0);
    strokeWeight(2);
    // Draw the arm
    line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y);
    fill(127);
    // Draw the ball
    circle(this.bob.x, this.bob.y, this.ballr * 2);
  }

  // The methods below are for mouse interaction

  // This checks to see if we clicked on the pendulum ball
  clicked(mx, my) {
    let d = dist(mx, my, this.bob.x, this.bob.y);
    if (d < this.ballr) {
      this.dragging = true;
    }
  }

  // This tells us we are not longer clicking on the ball
  stopDragging() {
    this.angleVelocity = 0; // No velocity once you let go
    this.dragging = false;
  }

  drag() {
    // If we are draging the ball, we calculate the angle between the
    // pendulum origin and mouse position
    // we assign that angle to the pendulum
    if (this.dragging) {
      let diff = p5.Vector.sub(this.pivot, createVector(mouseX, mouseY)); // Difference between 2 points
      this.angle = atan2(-1 * diff.y, diff.x) - radians(90); // Angle relative to vertical axis
    }
  }
}
