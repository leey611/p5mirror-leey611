let x = 300
let y = 300
let r = 25

let xspeed = 3
let yspeed = 2
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  ellipse(x, y, r*2, r*2)
  
  x+=xspeed
  y+=yspeed
  
  if (x > width - r || x < 0+r) {
    xspeed = xspeed * -1
  }
  
  if (y > height - r || y < 0+r) {
    yspeed = yspeed * -1
  }
}