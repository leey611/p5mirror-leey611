let firstShader;
let img;

function preload() {
  firstShader = loadShader('shader.vert', 'shader.frag');

  img = loadImage("mountain.jpg");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke();
}

function draw() {
  background(220);

  shader(firstShader);

  let mx = mouseX / width;
  let my = mouseY / height;

  firstShader.setUniform("mouse", [mx, my]);
  firstShader.setUniform("tex", img);

  rect(0, 0, width, height);

}