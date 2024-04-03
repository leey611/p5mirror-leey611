// modified from
// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

let theShader;
let webGLCanvas
let originalGraphics
let eyeGraphics
const flock = [];

function preload(){
	theShader = new p5.Shader('texture.vert','texture.frag')
}

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(1000, 1000, WEBGL);
	
	webGLCanvas = createGraphics(width,height,WEBGL)
	originalGraphics = createGraphics(width,height)
	eyeGraphics = createGraphics(width,height)
	
  // alignSlider = 2//createSlider(0, 2, 1.5, 0.1);
  // cohesionSlider = 0//createSlider(0, 2, 1, 0.1);
  // separationSlider = 2//createSlider(0, 2, 2, 0.1);
	alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
	
	originalGraphics.noStroke()
	webGLCanvas.noStroke()
	noStroke()
  for (let i = 0; i < 30; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  //background(240);
	
	webGLCanvas.shader(theShader)
  
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", millis() / 1000.0);
  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  
	theShader.setUniform('u_resolution',[width/1000,height/1000])
	theShader.setUniform('u_time',millis()/1000)
	theShader.setUniform('u_mouse',[mouseX/width,mouseY/height])
	theShader.setUniform('u_tex',originalGraphics)
	//console.log(mouseX/width)
	
  
  
	webGLCanvas.clear()
	webGLCanvas.rect(-width/2,-height/2,width,height)
	
	originalGraphics.background(240)
	eyeGraphics.clear()
  for (let boid of flock) {
    //boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show(originalGraphics, eyeGraphics);
  }
	
	image(webGLCanvas,0,0)
	image(eyeGraphics,0,0)
	
	//image(originalGraphics,0,0)
}