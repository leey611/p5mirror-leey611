// Coding Train / Daniel Shiffman

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { Gravysicsavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let eyes = [];
let springs = [];

let showSprings = false;

let g;

let face;
let feet;
let arms;
let wings;

function keyPressed() {
  if (key == " ") {
    showSprings = !showSprings;
  }
}

let img;
let frame;
let framePoints = [];

function preload() {
  img = loadImage("/assets/face/face_03.png");
  feet = loadImage("/assets/feet/feet_03.png");
  arms = {
    l: loadImage("/assets/arm/arm_l_04.png"),
    r: loadImage("/assets/arm/arm_r_04.png"),
  };
  wings = {
    l: loadImage("/assets/wing/wing_l_03.png"),
    r: loadImage("/assets/wing/wing_r_03.png"),
  };
}

function setup() {
  createCanvas(640, 360);
  imageMode(CENTER);
  g = createGraphics(640, 360);
  physics = new VerletPhysics2D();

  let bounds = new Rect(-width / 2, -height / 2, width, height);
  physics.setWorldBounds(bounds);

  particles.push(new Particle(200, 100));
  particles.push(new Particle(250, 100));
  particles.push(new Particle(300, 100));
  particles.push(new Particle(350, 100));
  particles.push(new Particle(400, 100));
  particles.push(new Particle(350, 200));
  particles.push(new Particle(400, 300));
  particles.push(new Particle(350, 300));
  particles.push(new Particle(300, 300));
  particles.push(new Particle(250, 300));
  particles.push(new Particle(200, 300));
  particles.push(new Particle(250, 200));

  eyes.push(new Particle(275, 150));
  eyes.push(new Particle((325 + 275) / 2, 150));
  eyes.push(new Particle(250, 50));
  eyes.push(new Particle(350, 50));

  frame = Snap.select("#frame_03");
  framePoints = extractSilhouettePoints(frame);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (i !== j) {
        let a = particles[i];
        let b = particles[j];
        // let b = particles[(i + 1) % particles.length];
        springs.push(new Spring(a, b, 0.001));
      }
    }
  }
  for (let i = 0; i < framePoints.length; i++) {
    for (let j = i + 1; j < framePoints.length; j++) {
      if (i !== j) {
        let a = framePoints[i];
        let b = framePoints[j];
        // let b = particles[(i + 1) % particles.length];
        springs.push(new Spring(a, b, 0.001));
      }
    }
  }

  for (let particle of particles) {
    springs.push(new Spring(particle, eyes[0], 0.01));
    springs.push(new Spring(particle, eyes[1], 0.01));
  }

  springs.push(new Spring(eyes[2], particles[1], 0.01));
  springs.push(new Spring(eyes[3], particles[3], 0.01));

  springs.push(new Spring(eyes[2], particles[3], 0.01));
  springs.push(new Spring(eyes[3], particles[1], 0.01));

  springs.push(new Spring(eyes[2], particles[0], 0.01));
  springs.push(new Spring(eyes[3], particles[4], 0.01));

  springs.push(new Spring(eyes[3], particles[2], 0.01));
  springs.push(new Spring(eyes[2], particles[2], 0.01));

  springs.push(new Spring(eyes[2], eyes[3], 0.01));

  springs.push(new Spring(eyes[0], eyes[3], 0.01));
  springs.push(new Spring(eyes[0], eyes[2], 0.01));
  springs.push(new Spring(eyes[1], eyes[2], 0.01));
  springs.push(new Spring(eyes[1], eyes[3], 0.01));
}


function extractSilhouettePoints(svg) {
  console.log("extract sil", svg);
  const points = [];
  // Get all path elements from the SVG
  const pathElements = svg.selectAll("path");
  console.log("extract fun", pathElements);
  //Loop through each path element and extract points
  for (const path of pathElements.items) {
    const pathData = path.node.getAttribute("d");
    const pathPoints = getPathSilhouettePoints(pathData);
    points.push(...pathPoints);
  }

  return points;
}
function getPathSilhouettePoints(pathData) {
  const path = new Path2D(pathData);
  const pathLength = Snap.path.getTotalLength(pathData);
  const points = [];

  for (let t = 0; t <= 1; t += 0.08) {
    const { x, y } = Snap.path.getPointAtLength(pathData, pathLength * t);
    //path.getPointAtLength(pathLength * t);
    points.push(new Particle(x, y));
  }

  return points;
}

function draw() {
  background(255);

  physics.update();

  stroke(112, 50, 126);
  if (showSprings) stroke(112, 50, 126, 100);

  // strokeWeight(4);
  // line(particles[1].x, particles[1].y, eyes[2].x, eyes[2].y);
  // line(particles[3].x, particles[3].y, eyes[3].x, eyes[3].y);
  //strokeWeight(16);
  // point(eyes[2].x, eyes[2].y);
  // point(eyes[3].x, eyes[3].y);
  // push()
  // strokeWeight(1)
  // rect(eyes[2].x, eyes[2].y, 10, 10);
  // rect(eyes[3].x, eyes[3].y, 10, 10);
  // pop()

  // push()
  // particles[0].lock()
  // particles[0].x = mouseX
  // particles[0].y = mouseY
  // particles[0].unlock()
  // pop()

  // fill(45, 197, 244);
  // if (showSprings) fill(45, 197, 244, 100);
  // strokeWeight(2);
  // beginShape();
  // for (let particle of particles) {
  //   curveVertex(particle.x, particle.y);
  // }
  // curveVertex(particles[0].x, particles[0].y)
  // curveVertex(particles[1].x, particles[1].y)
  // curveVertex(particles[2].x, particles[2].y)
  // endShape();
  // let face1 = new Vec2D(eyes[1].x, eyes[1].y);
  // let face2 = new Vec2D(particles[4].x, particles[4].y)
  // let vectorBetween = face2.sub(face1)

  // push()
  // imageMode(CENTER)
  // //angleMode(DEGREES)
  // translate(eyes[1].x, eyes[1].y)
  // //rotate( degrees(particles[0].heading()))
  // rotate(0.6)
  // rotate(vectorBetween.heading())
  // //console.log(degrees(angle))
  // image(img, 0, 0, 100,100);
  // pop()

  //   fill(127, 127);
  //   stroke(0);
  //   strokeWeight(2);
  //   beginShape();
  //   for (let particle of particles) {
  //     vertex(particle.x, particle.y);
  //   }
  //   endShape(CLOSE);

  // for (let particle of particles) {
  //   particle.show();
  // }

  // eyes[0].show();
  // eyes[1].show();

  push();
  translate(width / 2, height / 2);
  // wings
  push();
  let wingW = 80;
  let wingH = 80;
  translate(framePoints[5].x, framePoints[5].y);
  //translate(-wingW/2,0)
  rotate(framePoints[0].sub(framePoints[4]).heading());
  image(wings.l, -wingW / 3, 0, wingW, wingH);
  pop();
  push();
  translate(framePoints[12].x, framePoints[12].y);
  rotate(-PI / 2);
  rotate(framePoints[12].sub(framePoints[9]).heading());
  //translate(wingW/2,0)
  image(wings.r, wingW / 3, 0, wingW, wingH);
  pop();
  fill("pink");
  if (showSprings) fill(45, 197, 244, 100);
  strokeWeight(1);
  beginShape();
  for (let fp of framePoints) {
    curveVertex(fp.x, fp.y);
  }
  curveVertex(framePoints[0].x, framePoints[0].y);
  curveVertex(framePoints[1].x, framePoints[1].y);
  curveVertex(framePoints[2].x, framePoints[2].y);
  endShape();
  // face
  push();
  translate(framePoints[10].x, framePoints[10].y);
  rotate(framePoints[10].sub(framePoints[7]).heading());
  image(img, 0, 0, 50, 50);
  pop();

  // arms
  push();
  translate(framePoints[5].x, framePoints[5].y);
  rotate(framePoints[0].sub(framePoints[4]).heading());
  image(arms.l, 0, 0, 60, 60);
  pop();
  push();
  translate(framePoints[12].x, framePoints[12].y);
  rotate(-PI / 2);
  rotate(framePoints[12].sub(framePoints[9]).heading());
  image(arms.r, 0, 0, 60, 60);
  pop();
  // feet
  push();
  let feetW = 90;
  let feetH = 70;
  translate(framePoints[2].x, framePoints[2].y);
  rotate(-PI / 2);
  rotate(framePoints[2].sub(framePoints[9]).heading());
  image(feet, 0, feetH / 4, feetW, feetH);
  pop();
  for (let i = 0; i < framePoints.length; i++) {
    const point = framePoints[i];
    text(i, point.x, point.y);
    //circle(point.x, point.y,5)
  }
  pop();

  // for(let i=0; i<particles.length; i++) {
  //   noStroke()
  //   fill('red')
  //   text(i, particles[i].x, particles[i].y)
  // }
  // for(let i=0; i<eyes.length; i++) {
  //   noStroke()
  //   fill('green')
  //   text(i, eyes[i].x, eyes[i].y)
  // }

  if (showSprings) {
    for (let spring of springs) {
      spring.show();
    }
  }

  if (mouseIsPressed) {
    particles[4].lock();
    particles[4].x = mouseX;
    particles[4].y = mouseY;
    particles[4].unlock();
  }
  if (mouseIsPressed) {
    push();
    // translate(width/2, height/2)
    framePoints[0].lock();
    framePoints[0].x = mouseX - width / 2;
    framePoints[0].y = mouseY - height / 2;
    framePoints[0].unlock();
    pop();
  }
}
