// fork from https://editor.p5js.org/beesandbombs/sketches/NEdfEmxD
// creator: beesandbombs.com
var myFont;
function preload() {
  myFont = loadFont("WorkSans-SemiBold.ttf");
}

function setup() {
  // sketch's config: dimension, font size, alignment
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(0.09 * min(width, height));
  textAlign(CENTER, CENTER);

  // Number of characters in the text
  N = myText.length;
  
  // Initialize variables for position calculations
  // var x = 0,
  //  wid = 0;

  // Calculate the raw positions of each character in the text
  for (i = 0; i < N; i++) {
    if (i > 0) x += 0.5 * textWidth(myChar);
    myChar = myText.charAt(i);
    x += 0.5 * textWidth(myChar);
    rawPosns[i] = x;
  }
  // Calculate the total width of the text
  wid = x + 0.5 * textWidth(myChar);

  // Adjust raw positions to center the text horizontally
  for (i = 0; i < N; i++) {
    rawPosns[i] -= 0.5 * wid;
  }
}

// Declare variables
var myChar;
var myText = "WARPING~TEXT";
var N;
var x = 0,
  wid = 0,
  tot = 0,
  y = 0;
var posns = [],
  rawPosns = [],
  scales = [];
var t;

// Easing function
function ease(p, g) {
  if (p < 0.5) return 0.5 * pow(2 * p, g);
  else return 1 - 0.5 * pow(2 * (1 - p), g);
}

function draw() {
  t = 0.0004 * millis(); // Time variable based on millis
  background(0);
  fill(255);
  // Translate to the center of the canvas
  push();
  translate(width / 2, height / 2);
  // Loop through vertical positions
  for (a = -4; a < 5; a++) {
    x = 0;
    y = textAscent() * 0.85 * a;
    // Calculate scaling factor for each character based on mouse position
    for (i = 0; i < N; i++) {
      ph =
        0.02 *
        dist(
          mouseX - width / 2,
          mouseY - height / 2,
          textWidth("A") * (i - 0.5 * (N - 1)),
          y
        );
      sc = map(cos(TWO_PI * t - ph), 1, -1, 0.25, 1);
      scales[i] = sc;
    }
    // Calculate positions of each character with scaling
    for (i = 0; i < N; i++) {
      ii = (i + a + 4) % N;
      if (i > 0) x += 0.5 * textWidth(myChar) * scales[i - 1];
      myChar = myText.charAt(ii);
      x += 0.5 * textWidth(myChar) * scales[i];
      posns[i] = x;
    }
    tot = x + 0.5 * textWidth(myChar) * scales[N - 1];
    // Push matrix, translate, scale, and translate again for each line
    push();
    translate(0, y);
    scale(wid / tot, 1);
    translate(-tot / 2, 0);
    for (i = 0; i < N; i++) {
      ii = (i + a + 4) % N;
      push();
      translate(posns[i], 0);
      scale(scales[i], 1);
      text(myText.charAt(ii), 0, 0);
      pop();
    }
    pop();
  }

  pop();
}
