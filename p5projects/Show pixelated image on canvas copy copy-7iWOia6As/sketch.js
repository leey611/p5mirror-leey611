const scaleFactor = 100;
let catImg;

function preload() {
  catImg = loadImage('cat.png');
}

function setup() {
  createCanvas(catImg.width * scaleFactor, catImg.height * scaleFactor);
  // this isn't critical, there's just no point in doing high DPI
  // rendering for pixel aligned squares.
  pixelDensity(1);
  background(255);
  noLoop();
  noStroke();
}

function draw() {
  for (let x = 0; x < catImg.width; x++) {
    for (let y = 0; y < catImg.height; y++) {
      const c = catImg.get(x, y);
      fill(c);
      square(x * scaleFactor, y * scaleFactor, scaleFactor);
    }
  }
}