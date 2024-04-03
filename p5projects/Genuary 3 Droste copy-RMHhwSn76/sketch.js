let gB, fullRes, windowRes;
let requiredFrames = 360;
let wobbleEachFrame = false;
let rotateEachFrame = false
let exportGifStraightAway = false;

function setup() {
  windowRes = min(windowWidth, windowHeight);
  createCanvas(windowRes, windowRes);
  imageMode(CENTER);
  gB = createGraphics(fullRes = 1024, fullRes);
  gB.colorMode(HSB, 360);
  gB.imageMode(CENTER);
  background(360);
}

function draw() {
  gB.resetMatrix();
  gB.translate(gB.width * 0.5, gB.height * 0.5);
  gB.stroke(0);
  gB.noFill();
  gB.strokeWeight(1);
  
  if (frameCount == 1) {
    gB.stroke(0, 360, 360, 1);
    gB.ellipse(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random() * random());
    gB.rect(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random());
    gB.stroke(120, 360, 360, 1);
    gB.ellipse(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random() * random());
    gB.rect(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random());
    gB.stroke(240, 360, 360, 1);
    gB.ellipse(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random() * random());
    gB.rect(fullRes * random(-0.5, 0.5), fullRes * random(-0.5, 0.5), fullRes * random());
    if (exportGifStraightAway) {
      sG();
    }
  }
  
  gB.rotate(rotateEachFrame * 0.005);
  gB.image(gB, wobbleEachFrame * random(-1, 1) * random(), wobbleEachFrame * random(-1, 1) * random(), fullRes * 0.95, fullRes * 0.95);
  background(360);
  displayBuffer(gB);
  
  if (frameCount > requiredFrames) {
    noLoop();
  }
}

function sG() {
  windowRes = 512;
  resizeCanvas(512, 512);
  saveGif('export', requiredFrames, {
  delay: 0,
  units: "frames"
  });
}

function keyPressed() {
  if (key === "r") {
    sG();
  }
  if (key === "s") {
  saveCanvas();
  }
}

function displayBuffer(buffer) {
  image(buffer, windowRes / 2, windowRes / 2, windowRes, windowRes);
}

function windowResized() {
  windowRes = min(windowWidth, windowHeight);
  resizeCanvas(windowRes, windowRes);
}