// Coding Train / Daniel Shiffman: https://thecodingtrain.com/challenges/177-soft-body-character

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let g

let physics;

let particles = [];
let eyes = [];
let springs = [];

let showSprings = false;
let homieCount = 10
let homieGraphic
let homieGraphics = []
let quadrantDiagramGraphic
let pixelShader

function keyPressed() {
  if (key == ' ') {
    showSprings = !showSprings;
  }
}

function setup() {
  createCanvas(900, 900);
  homieGraphic = createGraphics(width, height)
  for (let i=0; i<5; i++) {
    homieGraphics.push(createGraphics(width, height))
  }
  quadrantDiagramGraphic = createGraphics(width, height)
  pixelShader = loadShader('shader.vert', 'shader.frag');
  physics = new VerletPhysics2D();

  let bounds = new Rect(-width/2, -height/2, width, height);
  physics.setWorldBounds(bounds);

  particles.push(new Particle(-220, -180));
  particles.push(new Particle(-170, -180));
  particles.push(new Particle(-120, -180));
  particles.push(new Particle(130, -180));
  particles.push(new Particle(180, -180));
  particles.push(new Particle(30, 20));
  particles.push(new Particle(180, 180));
  particles.push(new Particle(130, 180));
  particles.push(new Particle(-20, 180));
  particles.push(new Particle(-70, 180));
  particles.push(new Particle(-220, 180));
  particles.push(new Particle(-70, 20));

  eyes.push(new Particle(-45, -30));
  eyes.push(new Particle(-5, -30));
  // eyes.push(new Particle(-70, -130));
  // eyes.push(new Particle(30, -130));

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
 
  for (let particle of particles) {
    springs.push(new Spring(particle, eyes[0], 0.01));
    springs.push(new Spring(particle, eyes[1], 0.01));
  }

//   springs.push(new Spring(eyes[2], particles[1], 0.01));
//   springs.push(new Spring(eyes[3], particles[3], 0.01));

//   springs.push(new Spring(eyes[2], particles[3], 0.01));
//   springs.push(new Spring(eyes[3], particles[1], 0.01));

//   springs.push(new Spring(eyes[2], particles[0], 0.01));
//   springs.push(new Spring(eyes[3], particles[4], 0.01));

//   springs.push(new Spring(eyes[3], particles[2], 0.01));
//   springs.push(new Spring(eyes[2], particles[2], 0.01));

//   springs.push(new Spring(eyes[2], eyes[3], 0.01));

//   springs.push(new Spring(eyes[0], eyes[3], 0.01));
//   springs.push(new Spring(eyes[0], eyes[2], 0.01));
//   springs.push(new Spring(eyes[1], eyes[2], 0.01));
//   springs.push(new Spring(eyes[1], eyes[3], 0.01));
}

function draw() {
  background(255);
  drawGrid(quadrantDiagramGraphic)
  
//   push()
//   translate(width/2, height/2)
//   physics.update();

//   stroke(112, 50, 126);
//   if (showSprings) stroke(112, 50, 126, 100);
  //push()
  //translate(width/2, height/2)
  
 
  
  // strokeWeight(4);
  // line(particles[1].x, particles[1].y, eyes[2].x, eyes[2].y);
  // line(particles[3].x, particles[3].y, eyes[3].x, eyes[3].y);
  // strokeWeight(16);
  // point(eyes[2].x, eyes[2].y);
  // point(eyes[3].x, eyes[3].y);

  // fill(45, 197, 244);
  // if (showSprings) fill(45, 197, 244, 100);
  // strokeWeight(2);
  // beginShape();
  // for (let particle of particles) {
  //   vertex(particle.x, particle.y);
  // }
  // endShape(CLOSE);

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
  
  // for (let eye of eyes) {
  //   eye.show();
  // }

  // if (showSprings) {
  //   for (let spring of springs) {
  //     spring.show();
  //   }
  // }

  // if (mouseIsPressed) {
  //   particles[0].lock();
  //   particles[0].x = mouseX-width/2;
  //   particles[0].y = mouseY-height/2;
  //   particles[0].unlock();
  // }
  // pop()
  //drawShape(homieGraphic,2)
  //drawShape(homieGraphic,1)
  
  drawShape(homieGraphic,1)
  //drawShape(homieGraphics[1], 0.9)
  // for(let i=0; i<homieGraphics.length; i++) {
  //   drawShape(homieGraphics[i], 1-i*0.1)
  // }
}

function drawShape(g, scaleV) {
  //g.clear()
  //g.background(255);
  g.push();
  g.translate(width / 2, height / 2);
  // g.scale(scaleV, scaleV)
  physics.update();
  g.fill(45, 197, 244);
  //g.stroke(bodyStrokeColorPicker.color());
  // if (showSprings.checked())
  //   g.stroke([
  //     red(bodyStrokeColorPicker.color()),
  //     green(bodyStrokeColorPicker.color()),
  //     blue(bodyStrokeColorPicker.color()),
  //     100,
  //   ]);

  //g.fill(bodyColorPicker.color());
  stroke(112, 50, 126);
  if (showSprings) stroke(112, 50, 126, 100);

  //if (showSprings.checked())
    // g.fill([
    //   red(bodyColorPicker.color()),
    //   green(bodyColorPicker.color()),
    //   blue(bodyColorPicker.color()),
    //   100,
    // ]);

  g.strokeWeight(4);

  //if (modeSelect.value() === "直線") {
    // g.beginShape(); // 開始將點點們變成Shape
    // for (let particle of particles) {
    //   g.vertex(particle.x, particle.y);
    // }
    // g.endShape(CLOSE);
  //}
  
    g.beginShape();
    for (let p of particles) {
      g.curveVertex(p.x, p.y);
    }
    g.curveVertex(particles[0].x, particles[0].y);
    g.curveVertex(particles[1].x, particles[1].y);
    g.curveVertex(particles[2].x, particles[2].y);
    g.endShape();
  
  for (let eye of eyes) {
    eye.show(g);
  }

  
  if (mouseIsPressed) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      particles[0].lock();
      particles[0].x = mouseX - width/2;
      particles[0].y = mouseY - height/2;
      particles[0].unlock();
    }
  }
  g.pop();
  push()
  imageMode(CENTER)
  translate(width/2, height/2)
  scale(scaleV, scaleV)
  image(g, 0,0)
  pop()
}

function drawGrid(graphic) {
  graphic.clear()
  
  graphic.push()
    graphic.strokeWeight(1)
    graphic.translate(width/2, height/2)
    graphic.line(-width/2, 0, width/2, 0) // X軸
    graphic.line(0, -height/2, 0, height/2) // Y軸

    for (let x=-width/2; x<width/2; x+=50) {
      graphic.line(x, 0, x, 5 )
      graphic.textSize(8)
      graphic.text(x, x, 10)
    }
  
    for (let y=-height/2; y<height/2; y+=50) {
      graphic.line(0, y, 5, y)
      graphic.textSize(8)
      graphic.text(y, 0, y)
    }
  
  graphic.pop()
  
  image(graphic, 0, 0)
}

function keyTyped() {
	if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'jpg');
  }
  return false;
}
