// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

let lineSegments = [];

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      //arr[i][j] = 0;
      arr[i][j] = new MySquare()
    }
  }
  return arr;
}

class MySquare {
  constructor() {
    this.state = hueValue
    this.isLine = false
  }
}

// The grid
let grid;
// How big is each square?
let w = 4;
let cols, rows;
let hueValue = 200;

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas(500, 300);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
}
function mouseDragged() {
    //lineSegments.push({x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY});

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
          grid[col][row].state = hueValue;
        }
      }
    }
  }
  // Change the color of the sand over time
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function mouseClicked() {
  // Calculate the column and row where the mouse was clicked
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  
  // Check if the click is within the grid bounds
  if (withinCols(col) && withinRows(row)) {
    // Read the index of the grid based on the mouse click
    // let index = grid[col][row];
    // grid[col][row].state = 360
    // console.log("Index at (" + col + ", " + row + "): " + index);
  }
}


function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < lineSegments.length; i++) {
    line(lineSegments[i].x1, lineSegments[i].y1, lineSegments[i].x2, lineSegments[i].y2);
  }
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j].state > 0) {
        fill(grid[i][j].state, 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }
  
  // Create a 2D array for the next frame of animation
  let nextGrid = make2DArray(cols, rows);
  
  // Check every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows ; j++) {
      // What is the state?
      let state = grid[i][j].state;
      
      // If it's a piece of sand!
      if (state > 0) {
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
          nextGrid[i][j + 1].state = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1].state = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1].state = state;
        // Stay put!
        } else {
          nextGrid[i][j].state = state;
        }
      }
    }
  }
  grid = nextGrid;
}
