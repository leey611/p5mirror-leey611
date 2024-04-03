//p5 code
var linex = 0;
var liney = 0;
var spacing = 50;

var crossx = 0;
var crossy = 0;

var trix = 0;
var triy = 0;
var randomNum;

var keyispressed = false;
var a = 0;



function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	background(0);
	randomNum = random(1);
	canvas.position(0,0);
	canvas.style('z-index', '-1');
}

function draw() {
	angleMode(DEGREES);
	//background(0);
	if (randomNum < 0.5) {
		drawLines();
	} else{
		drawCross();
	}
	//drawTriangle();
  
}

function keyPressed() {
  keyispressed = true;
}

// if(keyispressed) {
//   a++;

// }
a++;
console.log(a)
//print(a);
// function windowResized() {
// 	console.log('resized');
// 	resizeCanvas(windowWidth,windowHeight);
// 	//clear();
// 	background(0);
// 	drawLines();
// }

function drawLines() {
	stroke(255);
	if (random(1) < 0.5){
      if(keyispressed) {
		rotate(a);
      }
		line(linex, liney, linex + spacing, liney + spacing);
	} else {
      if(keyispressed) {
        rotate(a);
      }
		line(linex, liney + spacing, linex + spacing, liney);
	}
	linex = linex + spacing;
	if (linex > width) {
		linex = 0;
		liney = liney + spacing;
	}
}

function drawCross() {
	stroke(255);
	if (random(1) < 0.5) {
      if(keyispressed) {
        rotate(a);
      }
		line(crossx, crossy, crossx + spacing, crossy); //horizontal
	} else {
      if(keyispressed) {
        rotate(a);
      }
		line(crossx + spacing, crossy, crossx + spacing, crossy + spacing); //vertical
	}
	crossx = crossx + spacing;
	if (crossx > width) {
		crossx = 0;
		crossy = crossy + spacing;
	}
}

function drawSquare() {
	stroke(255);
	if (random(1) < 0.5) {
		rect(linex, liney, spacing, spacing);
	} else {

	}
}

function drawTriangle() {
	stroke(255);
	//noStroke();
	//fill(255);
	noFill();
	if (random(1) < 0.5) {
		triangle(trix, triy, trix + spacing, triy, trix + spacing, triy + spacing);
	} else {
		triangle(trix, triy, trix + spacing, triy, trix, triy + spacing);
	}
	trix = trix + spacing;
	if (trix > width) {
		trix = 0;
		triy = triy + spacing;
	} 
}