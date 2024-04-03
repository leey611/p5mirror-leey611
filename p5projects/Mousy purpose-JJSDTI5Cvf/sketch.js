let flowfield;
let cols = 20;
let rows = 20;

let vehicle;

let debug = true;
let vehicles = []

function setup() {
  createCanvas(400, 400);

  vehicle = new Vehicle(350, 200);
  for (let i=0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height)))
  }

  w = width / cols;
  h = height / cols;

  // flowfield = [];
  // for (let i = 0; i < 10; i++) {
  //   flowfield[i] = [];
  // }

  // Creating a 2D array
  flowfield = new Array(cols);
  for (let i = 0; i < flowfield.length; i++) {
    flowfield[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // flowfield[i][j] = createVector(-1, 1);
      // flowfield[i][j] = p5.Vector.random2D();

      let x = i * w + w * 0.5;
      let y = j * h + h * 0.5;

      let centerX = width / 2;
      let centerY = height / 2;

      flowfield[i][j] = createVector(centerX - x, centerY - y);
      flowfield[i][j].rotate(-PI / 2 + 0.1);
    }
  }
}

function draw() {
  background(255);

  // DEBUG view!
  if (debug) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        flowfield[i][j].rotate(0.01);

        let v = flowfield[i][j].copy();
        v.setMag(w * 0.4);

        let x = i * w + w * 0.5;
        let y = j * h + h * 0.5;
        //strokeWeight(1);
        //stroke(0, 50);
        //rectMode(CENTER);
        //noFill();
        //rect(x, y, w, h);
        stroke(0, 100);
        strokeWeight(4);
        point(x, y);
        strokeWeight(1);
        line(x, y, x + v.x, y + v.y);
      }
    }
  }

  //vehicle.show();

  noFill();
  strokeWeight(2);
  stroke(255, 0, 0);
  // beginShape();
  // for (let i = 0; i < 100; i++) {
  //   //vehicles[i].follow(flowfield)
  //   vehicles[i].update()
  //   vertex(vehicles[i].position.x, vehicles[i].position.y)
  //   vehicle.follow(flowfield);
  //   // vehicle.update();
  //   // vertex(vehicle.position.x, vehicle.position.y);
  // }
  // endShape();
  for (let i=0; i<vehicles.length; i++) {
    beginShape()
    for (let j=0; j<100; j++) {
      vehicles[i].follow(flowfield)
      vehicles[i].update()
      vertex(vehicles[i].position.x,vehicles[i].position.y)
    }
    endShape()
  }

  //vehicle.show();

  noLoop();
}
