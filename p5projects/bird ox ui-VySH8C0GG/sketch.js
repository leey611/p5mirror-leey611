let controlBtn
let oxygenBar
let startOxygen = 50

let birdImg
let backgroundImg
let o2Img

// oxygen level bar

// a button to keep pressing to maintain the oxygen level

function setup() {
  createCanvas(windowWidth, windowHeight);
  controlBtn = new Button(width/2, height/2)
  oxygenBar = new OxygenBar(width/2 - 150, height-160, 50, startOxygen)
  
  birdImg = loadImage('images/bird.png')
  backgroundImg = loadImage('images/mining.png')
  o2Img = loadImage('images/o2bar.png'); 
}

function draw() {
  background(220);
  
  //image(birdImg,0,0)
  image(backgroundImg,0,0, windowWidth, windowHeight)
  image(o2Img,width/2 - 200,230, 150,200)
  
  controlBtn.show()
  controlBtn.update()
  //line(0,400,width,400)
  oxygenBar.show()
  oxygenBar.update()
}


function mousePressed() {
  if (controlBtn.isHover()) {
    oxygenBar.addOxygen()
  }
  //controlBtn.addOxygen(oxygenBar)
}



