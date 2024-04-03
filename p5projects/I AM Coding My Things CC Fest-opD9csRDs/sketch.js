// modified from Coding Train / Daniel Shiffman: https://thecodingtrain.com/challenges/177-soft-body-character

// import physics engine (Toxiclibs.js)
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;
let particles = []; // where we save our particles
let springs = []; // where we save our springs

let shapeGraphic; // graphic/layer to draw the shape
let quadrantDiagramGraphic; // graphic/layer to draw the diagram
let webGLGraphic; // webGL graphic
let pixelShader; // shader for pixel effect

let screenShotBtn; // button to save canvas
let modeSelect; // select straight or curved mode for shape
let bodyColorPicker; // color picker for shape body
let bodyStrokeColorPicker; // color picker for shape stroke
let backgroundColorPicker; // color picker for background
let textColorPicker; // color picker for text, diagram
let strokeWeightSlider; // slider to adjust stroke weight
let pixelSliderX; // slider to adjust pixel effect on x axis
let pixelSliderY; // slider to adjust pixel effect on y axis
let showGrid; // checkbox to show/not show diagram
let showSprings; // checkbox to show/not show springs
let showShapePoints; // checkbox to show/not points
let showShape; // checkbox to show/not show shape

// preload
function preload() {
  pixelShader = loadShader("shader.vert", "shader.frag");
}

// p5 environment setup
function setup() {
  createCanvas(800, 800); // create a 800x800 canvas
  shapeGraphic = createGraphics(width, height); // create shapeGraphic graphic/layer to draw shape
  quadrantDiagramGraphic = createGraphics(width, height); // create quadrantDiagramGraphic to draw diagram
  webGLGraphic = createGraphics(width, height, WEBGL); // create webGL graphic/layer

  screenShotBtn = createButton("save canvas"); // create a button named save canvas
  screenShotBtn.mousePressed(() => saveCanvas("myCanvas", "jpg")); // when mouse clicks screenShotBtn, save canvas
  modeSelect = createSelect(); // create a select
  modeSelect.option("straight"); // add a straight option to modeSelect
  modeSelect.option("curved"); // add a curved option to modeSelect
  bodyColorPicker = createColorPicker("#fff"); // create color picker, #fff by default
  bodyStrokeColorPicker = createColorPicker("#ff00ff"); // create body stroke color picker, #ff00ff by default
  backgroundColorPicker = createColorPicker("#fff"); // create background color picker, #fff by default
  textColorPicker = createColorPicker("#000"); // crete text color picker, #000 by default
  strokeWeightSlider = createSlider(2, 20, 4, 1); // create stroke weight slider, min value 2, max value 20, default value 4, step value 1
  pixelSliderX = createSlider(0.1, 1, 1, 0.1); // create pixel x axis slider, min value 0.1, max value 1, default value 1, step value 0.1
  pixelSliderY = createSlider(0.1, 1, 1, 0.1); // create pixel y axis slider, min value 0.1, max value 1, default value 1, step value 0.1
  showShape = createCheckbox("show shape", false); // create showShape checkbox, false by default
  showGrid = createCheckbox("show diagram", true); // create showGrid checkbox, true by default
  showShapePoints = createCheckbox("show points", true); // create showShapePoints checkbox, true by default
  showSprings = createCheckbox("show springs", false); // create showSprings checkbox, false by default

  physics = new VerletPhysics2D();

  let bounds = new Rect(-width / 2, -height / 2, width, height);
  physics.setWorldBounds(bounds);

  // add points one by one in order into particles
  particles.push(new Particle(-350, -200)); // tzu's book
  particles.push(new Particle(0, 0)); // eleonora's essence
  particles.push(new Particle(300, -300)); // jack's watch
  particles.push(new Particle(350, 100)); // tzu's book
  particles.push(new Particle(350, 250)); // angela's phone
  particles.push(new Particle(350, 350)); // janie's birth control
  particles.push(new Particle(250, 300)); // nicole's laptop
  particles.push(new Particle(140, 200)); // tiny needling purse
  particles.push(new Particle(100, 300)); // matthew's pen
  particles.push(new Particle(0, 350)); // saber's coke
  particles.push(new Particle(-300, 300)); // jack's watch
  particles.push(new Particle(-350, 180)); // tiny needling purse
  particles.push(new Particle(-350, 300)); // nicole's laptop
  particles.push(new Particle(-250, 100)); // angela's phone
  
  // particles.push(new Particle(-150, -100)); // particle 0: position(-150, -100)
  // particles.push(new Particle(-20, -50)); // particle 1: position(-20, -50)
  // particles.push(new Particle(80, -80)); // particle 2: position(80, -80)
  // particles.push(new Particle(30, 20)); // particle 3: position(30, 20)
  // particles.push(new Particle(80, 120)); // particle 4: position(80, 120)
  // particles.push(new Particle(-20, 80)); // particle 5: position(-20, 80)
  // particles.push(new Particle(-120, 120)); // particle 6: position(-120, 120)
  // particles.push(new Particle(-70, 20)); // particle 7: position(-70, 20)

  // add springs between each particle
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
}

// do every frame
function draw() {
  //clear()
  webGLGraphic.shader(pixelShader);
  pixelShader.setUniform("mouse", [pixelSliderX.value(), pixelSliderY.value()]);
  pixelShader.setUniform("tex", shapeGraphic);
  webGLGraphic.rect(-width / 2, -height / 2, width, height);

  shapeGraphic.background(255);

  image(webGLGraphic, 0, 0);

  if (showShape.checked()) {
    // if showShape is checked
    drawShape(shapeGraphic); // draw shape on shapeGraphic
  }

  if (showGrid.checked()) {
    // if showGrid is checked
    drawGrid(quadrantDiagramGraphic); // draw diagram on quadrantDiagramGraphic
  }

  if (showSprings.checked()) {
    // if showSprings is checked
    drawSprings(quadrantDiagramGraphic); // draw springs on quadrantDiagramGraphic
  }

  if (showShapePoints.checked()) {
    // if showShapePoints is checked,
    drawShapePoints(quadrantDiagramGraphic); //draw points on quadrantDiagramGraphic
  }
}

// draw shape on the given graphic
function drawShape(g) {
  g.background(backgroundColorPicker.color());
  g.push();
  g.translate(width / 2, height / 2);
  physics.update();

  g.stroke(bodyStrokeColorPicker.color());
  if (showSprings.checked())
    g.stroke([
      red(bodyStrokeColorPicker.color()),
      green(bodyStrokeColorPicker.color()),
      blue(bodyStrokeColorPicker.color()),
      100,
    ]);

  g.fill(bodyColorPicker.color());

  if (showSprings.checked())
    g.fill([
      red(bodyColorPicker.color()),
      green(bodyColorPicker.color()),
      blue(bodyColorPicker.color()),
      100,
    ]);

  g.strokeWeight(strokeWeightSlider.value());

  if (modeSelect.value() === "straight") {
    g.beginShape(); // begin the make the shape with the vertices
    for (let particle of particles) {
      g.vertex(particle.x, particle.y);
    }
    g.endShape(CLOSE);
  }

  if (modeSelect.value() === "curved") {
    g.beginShape();
    for (let p of particles) {
      g.curveVertex(p.x, p.y);
    }
    g.curveVertex(particles[0].x, particles[0].y);
    g.curveVertex(particles[1].x, particles[1].y);
    g.curveVertex(particles[2].x, particles[2].y);
    g.endShape();
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
}

// draw diagram on the given graphic
function drawGrid(graphic) {
  graphic.clear(); //background("yellow")

  graphic.push();
  // graphic.textAlign(LEFT, TOP)
  graphic.stroke(textColorPicker.color());
  graphic.strokeWeight(1);
  graphic.fill(textColorPicker.color());
  graphic.translate(width / 2, height / 2);
  graphic.line(-width / 2, 0, width / 2, 0); // X axis
  graphic.line(0, -height / 2, 0, height / 2); // Y axis
  graphic.textSize(12);
  graphic.noStroke();
  for (let x = -width / 2; x < width / 2; x += 50) {
    graphic.line(x, 0, x, 5);
    graphic.text(x, x, 10);
  }

  for (let y = -height / 2; y < height / 2; y += 50) {
    graphic.line(0, y, 5, y);
    graphic.text(y, 0, y);
  }
  graphic.push();
  graphic.textAlign(RIGHT);
  graphic.text("protect", width / 2, 0);
  graphic.textAlign(LEFT);
  graphic.text("release", -width / 2, 0);
  graphic.text("human-made", 0, height / 2);
  graphic.textAlign(LEFT, TOP);
  graphic.text("nature", 0, -height / 2);
  graphic.pop();

  graphic.pop();

  image(graphic, 0, 0);
}

// draw points and index on the given graphic
function drawShapePoints(graphic) {
  graphic.clear();
  graphic.push();
  graphic.translate(width / 2, height / 2);
  particles.forEach((particle, index) => {
    graphic.push();
    //graphic.strokeWeight(5)
    //graphic.point(particle.x, particle.y)
    graphic.noFill();
    graphic.stroke(textColorPicker.color());
    //graphic.circle(particle.x, particle.y, 15);
    graphic.fill(textColorPicker.color());
    graphic.noStroke();
    graphic.textSize(15);
    graphic.textAlign(CENTER, CENTER);
    graphic.text(index, particle.x, particle.y);
    graphic.pop();
  });
  graphic.pop();
  image(graphic, 0, 0);
}

// draw springs on the given graphic
function drawSprings(graphic) {
  graphic.clear();
  graphic.push();
  graphic.translate(width / 2, height / 2);
  // graphic.stroke([
  //     red(bodyStrokeColorPicker.color()),
  //     green(bodyStrokeColorPicker.color()),
  //     blue(bodyStrokeColorPicker.color()),
  //     100]
  //   );

  for (let spring of springs) {
    graphic.stroke(textColorPicker.color());
    graphic.strokeWeight(1);
    spring.show(graphic);
  }

  graphic.pop();
  image(graphic, 0, 0);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "jpg");
  }
  return false;
}
