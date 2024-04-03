function Box(x, y, w, h) {
  var options = {
    friction: 0.5,
    restitution: 0.8,
    angle: PI
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    stroke(200);
    strokeWeight(2);
    fill(255, 255, 255, 100);
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}