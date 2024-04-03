// https://github.com/runemadsen/programmingdesignsystems.com/blob/master/examples/shape/custom-shapes/quad-circle.js
function setup()
{
  createCanvas(600, 500);
  background(240);

 
}

function draw() {
  background(240)
   const r = width * 0.25;
  const offset1 = 30
  const offset2 = 30
  const offset3 = 20
  noStroke();
  fill(30);
  //console.log(mouseX)
  translate(width/2, height/2);
  beginShape();
    vertex(0, -r)
    quadraticVertex(r-offset1, -r, r, 0+offset1);
    quadraticVertex(r+offset2, r-offset3, 0, r-offset3);
    quadraticVertex(-r-offset2, r-offset3, -r, 0+offset1);
    quadraticVertex(-r+offset1, -r, 0, -r);
  endShape();

  //noLoop();
}