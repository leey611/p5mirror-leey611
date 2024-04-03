// move mouseX to adjust threshold
let cam;
let span = 20
let cacheGraphic
let slides = []

function preload() {
  cam = createCapture(VIDEO);
}
function setup() {
  createCanvas(640, 480);
  cam.hide();
  cacheGraphic = createGraphics(width,height)
  cacheGraphic.translate(width,0)
  cacheGraphic.scale(-1,1)
  pixelDensity(1); // sets the pixel scaling for high pixel density displays.
  for (let i =0; i < width; i+=span) {
		let start = i
		let end = start+span
		let x = start
		let inc = 1
		slides.push({
			start, end, x, inc
		})
	}
}

function draw() {
  background(0); 
  cam.loadPixels();
  if (cam.pixels[0]) {
    for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let p = cam.get(x, y);
      let gray = floor((p[0] + p[1] + p[2]) / 3);
      let threshold = mouseX; 
      if (gray < threshold) {
        gray = map(threshold, 0, threshold, threshold, 0); // invert the color
      }
      let index = (x + y * width) * 4;
      if (frameCount > 5) {
        cam.pixels[index + 0] = gray; // red
        cam.pixels[index + 1] = gray; // green
        cam.pixels[index + 2] = gray; // blue
        cam.pixels[index + 3] = 255; // opacity
      }
    }
  }
  cam.updatePixels();
  let w = cam.width
  let h = cam.height
  for(let i = 0; i < slides.length; i++) {
			
			
			cacheGraphic.copy(cam, slides[i].start, 0, 1, h, slides[i].x,0, 1, h)
			
			slides[i].x+=slides[i].inc
			
			if(slides[i].x<slides[i].start || slides[i].x>slides[i].end) slides[i].inc*=-1
		}
  }
  
  image(cacheGraphic, 0, 0);
}
