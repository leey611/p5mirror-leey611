const marginLeft = 130
const marginTop=100
const marginBottom = 80
let stepX = 5
const stepY = 8
function setup() {
	createCanvas(650, 650);
	stroke(240)
	curveTightness(0.4)
}
let yoff=0
function draw() {
	background(0);
	fill(0)
	for(let i=marginTop; i<=height-marginBottom; i+=stepY) {
		let a = yoff+i
		beginShape()
		for(let j=marginLeft; j<=width-marginLeft; j+=stepX) {
			const mid = width/2
			let start = mid-80
			let end = mid+80
			let lineOffset=15
			if (i%2===0) {
				start-=lineOffset
				end-=lineOffset
			} 
			if (i%5===0) {
				start+=lineOffset
				end+=lineOffset
			}
			const peak = stepY*13

			let scaleVal;
			if (j>=start&&j<=mid) {
				scaleVal = map(j, start,mid, 6, peak)
			} else if (j>mid&&j<=end) {
				scaleVal = map(j, mid,end, peak, 6)
			} else {
				scaleVal = 5
			}
			let offset = noise(a,j)*scaleVal
			curveVertex(j, i-offset)

			if(j>=start&&j<=end) {
				stepX = 17
			} else {
				stepX = 5
			}
			a+=0.01
		}
		endShape()
		yoff+=0.0003
	}
	//yoff+=0.02
}

function keyTyped() {
	if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'png');
  }
  return false;
}