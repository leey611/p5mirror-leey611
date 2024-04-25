// Pointer finger to draw or pick color; flat "stop" hand to move pointer.  If it's having trouble tracking your finger, either change your background or try including your middle finger with your pointer finger.
//Handpose code by the ml5.js team.  Visit https://ml5js.org/
// Drawing code by Steve's Makerspace
// Video: https://youtu.be/96sWFP9CCkQ

// vars for handtracking
let handpose;
let video;
let predictions = [];
let canvas2;
let prevtop = null;
let prevleft = null;
let leftArr = [];
let topArr = [];
let leftAvg, topAvg;
let colr = 0;
let colb = 255;
let colg = 0;
let pointerX, pointerY, knuckle, ring;

// vars for sands
let lineSegments = [];
let sandGenerating = false;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

// The grid
let grid;
// How big is each square?
let w = 4;
let cols, rows;
let gravity;

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas(640, 480);
  canvas2 = createGraphics(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  // create grid
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  translate(width, 0);
  scale(-1, 1);
  //  background(0);

  //image(video, 0, 0, width, height);
  
  // code for CA
  if (sandGenerating) {
    let mouseCol = floor(cols / 2); // Middle column position
    let mouseRow = 0; // Top row position

    // Randomly add an area of sand particles
    let matrix = 1; // Set matrix width to 1
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (withinCols(col) && withinRows(row)) {
            grid[col][row] = 1;
          }
        }
      }
    }
  }

  stroke('green');
  strokeWeight(2);
  for (let i = 0; i < lineSegments.length; i++) {
    line(
      lineSegments[i].x1,
      lineSegments[i].y1,
      lineSegments[i].x2,
      lineSegments[i].y2
    );
  }
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] == 1) {
        fill('pink');
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      } else if (grid[i][j] == 2) {
        fill(255, 0, 0);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  // Create a 2D array for the next frame of animation
  let nextGrid = make2DArray(cols, rows);
  // new grid needs all the obstacles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state == 2) {
        nextGrid[i][j] = 2;
      }
    }
  }

  // Check every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // What is the state?
      let state = grid[i][j];

      // If it's a piece of sand!
      if (state == 1) {
        // What is below?
        let below = grid[i][j + 1];

        // Randomly fall left or right
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }

        // Check below left or right
        let belowA = -1;
        let belowB = -1;
        if (withinCols(i + dir)) {
          belowA = grid[i + dir][j + 1];
        }
        if (withinCols(i - dir)) {
          belowB = grid[i - dir][j + 1];
        }

        // Can it fall below or left or right?
        if (below === 0) {
          nextGrid[i][j + 1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state;
          // Stay put!
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
  
  
  image(canvas2, 0, 0);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    canvas2.strokeWeight(10);
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      //   ellipse(keypoint[0], keypoint[1], 10, 10);
      if (j == 8) {
        pointerX = keypoint[0];
        pointerY = keypoint[1];
        //print(keypoint);
      } else
      if (j == 14) {
        knuckle = keypoint[1];
      } else
      if (j == 16) {
        ring = keypoint[1];
      }
    }
    //If the ring finger is not extended then draw a line
    if (knuckle < ring) {
        
      
      fill(0);
      ellipse(pointerX, pointerY, 10, 10);
      if (pointerX < width - 70) {
        getaverages();

        canvas2.stroke(colr, colg, colb); // this is where the finger draws
        if (leftArr.length > 2 && prevleft>0) {
          canvas2.line(prevleft, prevtop, leftAvg, topAvg);
          if (prevleft > 0) {
          prevleft = leftAvg;
          prevtop = topAvg;}
          else{
            prevleft = pointerX;
            prevtop = pointerY;
          }
        }
      } 
      
    } else {
      //If the hand is extended, then just mark where it is and clear the arrays
      fill('yellow');
      ellipse(pointerX, pointerY, 10, 10);
      leftArr.length = 0;
      topArr.length = 0;
      leftAvg = 0;
      topAvg = 0;
      prevleft = pointerX;
      prevtop = pointerY;
    }
  }
}

function getaverages() {
  if (leftArr.length > 5) {
    leftArr.splice(0, 1);
    topArr.splice(0, 1);
  }
  if (pointerX > 0 ) {
  leftArr.push(pointerX);
  topArr.push(pointerY);
  }
  let leftSum = 0;
  let topSum = 0;
  for (i = 0; i < leftArr.length; i++) {
    leftSum = leftSum + leftArr[i];
    topSum = topSum + topArr[i];
  }
  leftAvg = leftSum / leftArr.length;
  topAvg = topSum / topArr.length;
  
}

function fingerDrawLine() {
  sandGenerating = true;

  let start = createVector(pmouseX, pmouseY);
  let end = createVector(mouseX, mouseY);

  // Calculate the direction vector
  let direction = p5.Vector.sub(end, start);
  direction.normalize();

  // Calculate the distance between start and end points
  let distance = p5.Vector.dist(start, end);

  // Set the step size to ensure points are densely packed along the vector
  let step = 0.02; // Adjust as needed

  // Iterate along the direction vector
  for (let d = 0; d < distance; d += step) {
    let current = p5.Vector.add(start, p5.Vector.mult(direction, d));
    let col = floor(current.x / w);
    let row = floor(current.y / w);
    grid[col][row] = 2;
  }

  // where the mouse was
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  grid[col][row] = 2;
}


function mouseDragged() {
  sandGenerating = true;

  let start = createVector(pmouseX, pmouseY);
  let end = createVector(mouseX, mouseY);

  // Calculate the direction vector
  let direction = p5.Vector.sub(end, start);
  direction.normalize();

  // Calculate the distance between start and end points
  let distance = p5.Vector.dist(start, end);

  // Set the step size to ensure points are densely packed along the vector
  let step = 0.02; // Adjust as needed

  // Iterate along the direction vector
  for (let d = 0; d < distance; d += step) {
    let current = p5.Vector.add(start, p5.Vector.mult(direction, d));
    let col = floor(current.x / w);
    let row = floor(current.y / w);
    grid[col][row] = 2;
  }

  // where the mouse was
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  grid[col][row] = 2;
}
