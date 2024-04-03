let handles = [[90,190], [10,110]];
let handleClicked;
let handleD = 12;

let points = [[15, 180], [85, 120]];
let pointClicked;

//let beziers = [ [points[0], handles[0], handles[1], points[1]]];
let beziers = 1;

let editMode = false;
let showImage = false;
let tangent= false;


let crtlPressed = false;

let w = 800;
let h = 600;

// const preview = document.querySelector('.preview');


let bg;

// function preload() {
//   bg = loadImage("nurse.jpg");
//   console.log(bg)
// }

function setup() {
  //console.log(bg.height)
  // w = bg.width/5;
  // h = bg.height/5;
  // input = createFileInput(handleFile)
  w = 700
  h = 450
  createCanvas(w,h);
  enableEdit();
  toggleTangent();
  backImage();
  backImage();
}

function draw() {
  if(showImage && bg){
    // console.log(bg);
    if(bg.height && bg.height !== height){
      resizeCanvas(bg.width,bg.height)
      w = bg.width
      h = bg.height
    }
    background(bg);
  } else {
    background(200);
  }
  noFill();
  stroke(255, 102, 0);
  strokeWeight(1);
  //stroke(0, 0, 0);
  for(let i = 0; i < beziers; i++){
    let j = i*2;
    let b = [points[j], handles[j], handles[j+1], points[j+1]];
    //console.log(b)
    strokeWeight(round(document.querySelector(".slider").value/10));
 stroke(document.querySelector(".redSlider").value, document.querySelector(".greenSlider").value, document.querySelector(".blueSlider").value)
    bezier(b[0][0], b[0][1], b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);
    if(editMode) {
      strokeWeight(1)
      stroke(255)
      line(b[0][0], b[0][1], b[1][0], b[1][1]);
      line(b[2][0], b[2][1], b[3][0], b[3][1]);
    }
  }
  if(editMode) interactive();
  
  
}

function mousePressed() {
  
  // Ensure that the mouse was clicked within the canvas and editMode is enabled
  if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && editMode){
    // Check to see if a handle was clicked
    for(let [i,p] of handles.entries()){
      // console.log("The "+ i + "th point " + p + " is "+ p[0]+"," +p[1])
      if(dist(p[0],p[1],mouseX,mouseY) <= handleD/2){
        handleClicked = i+1;
        // console.log(handleClicked)
        break;
      } else {
        handleClicked = false;
      }
    }
    
    // Check to see if a point was clicked
    for(let [i,p] of points.entries()){
      if(dist(p[0],p[1],mouseX,mouseY) <= handleD/2){
        pointClicked = i+1;
        // console.log(handleClicked)
        break;
      } else {
        pointClicked = false;
      }
    }
    
    if(handleClicked == false && pointClicked === false){
      beziers += 1;
      let th = atan2(points[points.length-1][1]-handles[handles.length-1][1], points[points.length-1][0]-handles[handles.length-1][0] )
      points.push([points[points.length-1][0], points[points.length-1][1]]);
      points.push([mouseX, mouseY]);
      handles.push([points[points.length-2][0] + 50*cos(th), points[points.length-2][1] + 50 *sin(th)]);
      th = atan2(handles[handles.length-1][1]-mouseY, handles[handles.length-1][0]-mouseX )
      handles.push([mouseX + 50*cos(th), mouseY+50*sin(th)]);
    }
  }
}

function mouseReleased() {
  handleClicked = false;
  pointClicked = false;
}

function keyPressed() {
  if(keyCode === CONTROL){
    ctrlPressed = true;
  }
  if(keyCode === 90 && keyIsDown(CONTROL) && points.length > 2){
    console.log(points.length);
    points.pop();
    points.pop();
    handles.pop();
    handles.pop();
    beziers -= 1;
  }
}

function keyReleased() {
  if(keyCode === CONTROL){
    ctrlPressed = false;
  }
}

function enableEdit() {
  editMode = !editMode;
  document.getElementById("edit").style.color = !editMode ?  "black" : "white";
  document.getElementById("edit").style.backgroundColor = !editMode ? "lightgray" : "gray";
}

function backImage() {
  showImage = !showImage;
  document.getElementById("image").style.color = !showImage ?  "black" : "white";
  document.getElementById("image").style.backgroundColor = !showImage ? "lightgray" : "gray";
}

function toggleTangent() {
  tangent = !tangent;
  document.getElementById("tangent").style.color = !tangent ?  "black" : "white";
  document.getElementById("tangent").style.backgroundColor = !tangent ? "lightgray" : "gray";
}

function interactive() {
  for(let [i,p] of points.entries()){
    if(i === pointClicked-1 & mouseIsPressed){
      fill(0,255,255);
    } else {
      noFill();
    }
    
    if(dist(p[0],p[1],mouseX,mouseY) <= handleD/2){
      stroke(0);
      strokeWeight(1.175);
    } else {
      stroke(30,120,230)
      strokeWeight(1);
    }
    
    circle(p[0], p[1], handleD);
  }
  
  fill(255);
  for(let [i,p] of handles.entries()){
    if(i === handleClicked-1 & mouseIsPressed){
      fill(250,90,60);
    } else {
      noFill();
    }
    
    if(dist(p[0],p[1],mouseX,mouseY) <= handleD/2){
      stroke(0);
      strokeWeight(1.175)
    } else {
      stroke(250,90,60)
      ;
      strokeWeight(1);
    }
    
    circle(p[0], p[1], handleD);
  }
  
  
  if(handleClicked && mouseIsPressed){
    handles[handleClicked-1][0] = mouseX > 0 && mouseX < w ? mouseX : mouseX > 0 ? w : 0;
    handles[handleClicked-1][1] = mouseY > 0 && mouseY < h ? mouseY : mouseY > 0 ? h : 0;
    
    if((handleClicked-1)%2 === 0 && handleClicked-1 > 1 && tangent) {
      let th = atan2(handles[handleClicked-1][1]-points[handleClicked-1][1], handles[handleClicked-1][0]-points[handleClicked-1][0]);
      let prevHandleMag = dist(handles[handleClicked-2][0], handles[handleClicked-2][1], points[handleClicked-1][0], points[handleClicked-1][1]);
      handles[handleClicked-2][0] = points[handleClicked-1][0] - prevHandleMag*cos(th);
      handles[handleClicked-2][1] = points[handleClicked-1][1] - prevHandleMag*sin(th);
    }
    if((handleClicked-1)%2 === 1 && handleClicked-1 > 0 && handleClicked !== handles.length && tangent) {
      let th = atan2(handles[handleClicked-1][1]-points[handleClicked][1], handles[handleClicked-1][0]-points[handleClicked][0]);
      let nextHandleMag = dist(handles[handleClicked][0], handles[handleClicked][1], points[handleClicked][0], points[handleClicked][1]);
      handles[handleClicked][0] = points[handleClicked][0] - nextHandleMag*cos(th);
      handles[handleClicked][1] = points[handleClicked][1] - nextHandleMag*sin(th);
    }
  }
  
  else if(pointClicked && mouseIsPressed){
    // console.log("Dragging")
    let h1dx = points[pointClicked-1][0] - handles[pointClicked-1][0];
    let h1dy = points[pointClicked-1][1] - handles[pointClicked-1][1];
    points[pointClicked-1][0] = mouseX > 0 && mouseX < w ? mouseX : mouseX > 0 ? w : 0;
    points[pointClicked-1][1] = mouseY > 0 && mouseY < h ? mouseY : mouseY > 0 ? h : 0;
    handles[pointClicked-1][0] = points[pointClicked-1][0] - h1dx;
    handles[pointClicked-1][1] = points[pointClicked-1][1] - h1dy;
    
    if((pointClicked-1)%2 === 0 && pointClicked-1){
      
      let h2dx = points[pointClicked][0] - handles[pointClicked][0];
      let h2dy = points[pointClicked][1] - handles[pointClicked][1];
      
      points[pointClicked-2][0] = mouseX > 0 && mouseX < w ? mouseX : mouseX > 0 ? w : 0;
      points[pointClicked-2][1] = mouseY > 0 && mouseY < h ? mouseY : mouseY > 0 ? h : 0;
      
      handles[pointClicked][0] = points[pointClicked][0] - h2dx;
      handles[pointClicked][1] = points[pointClicked][1] - h2dy;
      
    } 
    if((pointClicked-1)%2 === 1 && points[pointClicked]){
      
      let h2dx = points[pointClicked][0] - handles[pointClicked][0];
      let h2dy = points[pointClicked][1] - handles[pointClicked][1];
      
      points[pointClicked][0] = mouseX > 0 && mouseX < w ? mouseX : mouseX > 0 ? w : 0;
      points[pointClicked][1] = mouseY > 0 && mouseY < h ? mouseY : mouseY > 0 ? h : 0;
      
      handles[pointClicked][0] = points[pointClicked][0] - h2dx;
      handles[pointClicked][1] = points[pointClicked][1] - h2dy;
    }
    
  }
}



function handleFile() {
  // if (file.type === 'image') {
//     bg = createImg(file.data, '');
//     bg.hide();
//     bg = loadImage(bg);
//     console.log(bg)
//     resizeCanvas(bg.width,bg.height);
    
    const selectedFile = document.getElementById('upload');
    const myImageFile = selectedFile.files[0];
    let urlOfImageFile = URL.createObjectURL(myImageFile);
    bg = loadImage(urlOfImageFile);
    showImage = true;
    document.getElementById("image").style.color = !showImage ?  "black" : "white";
    document.getElementById("image").style.backgroundColor = !showImage ? "lightgray" : "gray";
    //resizeCanvas(bg.width,bg.height);
    //resizeCanvas(800,300);
  // } else {
  //   bg = null;
  // }
}