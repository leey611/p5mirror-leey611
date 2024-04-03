let savedFrames = [];
let i = 0;
let cam;
let g

function setup() {
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  g = createGraphics(width,height)
}

function draw() {
  background(220);
  if (frameCount < 600) {
    savedFrames.push(cam.get());
  } else {
    g.image(savedFrames[frameCount%600], 0, 0);
    image(g,0,0)
    //i++;
    if (i===savedFrames.length) i=0
  }
  
}
