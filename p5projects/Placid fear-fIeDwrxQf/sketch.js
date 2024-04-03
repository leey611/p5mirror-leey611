var x = 0;

function setup() {
	createCanvas(1000,800);
}

function draw() {
	background(0);
	ellipse(x, height/2, 20,20);

	x = x + 10;
	if (x > width) {
		x = 0;
	}
}