let snow= [];
var test=1;

let font,
fontsize = 30;

// function preload(){
//   //preload the font
//   font = loadFont('assets/SourceSansPro-Regular.otf');
// }

function setup() {
  createCanvas(600, 600);
  //40 snowflake in the whole canvas
  for (let i=0; i<40; i++){
    snow[i]=new Snow();
  }
  //text
//  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background("#B9B0B7");

  DrawGlass();
  DrawTree(260,200,230,50);
  DrawTree(430,270,150,30);
  DrawHouse();
  DrawTree2()
  SnowGround(360,430,210,30);
  SnowGround(260,430,250,30);
  //ShouldISnow();
  ShowandMoveSnow();
  Bottom();
  Text();
  }

function DrawGlass(){
  //draw the glass
  fill(255,80);
  stroke(255)
  strokeWeight(4)
  ellipse(300,280,450,450);

}

function DrawTree(PstnX, PstnY, Height, Width){
  //draw trees in the back
  fill("#657C54");
  strokeWeight(1);
  triangle(PstnX,PstnY,PstnX-1.2*Width,PstnY+Height,PstnX+1.2*Width,PstnY+Height);
  triangle(PstnX,PstnY-0.2*Height,PstnX-Width,PstnY+0.8*Height,PstnX+Width,PstnY+0.8*Height);

}

function DrawHouse(){
  //snow in the back
  fill(255,255,255);
  stroke(0)
  triangle(270,240,200,330,400,330);

  //The walls
  fill("#837E72");
  beginShape();
  triangle(280,250,220,320,340,320);
  rect(220,320,120,110);
  rect(340,320,80,110);
  endShape();

  //The snow at the front
  fill(255,255,255);
  quad(270,240,330,340,440,340,390,240);

  //Windows
  fill("#F0E091");
  ellipse(270,320,30,40);
  rect(230,360,20,30);
  rect(360,360,50,30);

  //Door
  fill("#A78B67");
  ellipse(300,410,50,80);
}

function DrawTree2(){
  fill("#78896C");
  stroke(255)
  triangle(180,320,130,440,230,440);
  triangle(180,280,140,380,220,380);
  triangle(180,240,150,330,210,330);
}

function Bottom(){
  //Bottom
  fill("#72817B");
  stroke("#5C6762");
  strokeWeight(2)
  rect(100,430,400,80);
  //Texture
  fill("#628B76");
  noStroke()
  rect(102,440,396,7);
  rect(102,490,396,15);
}

function SnowGround(SnowX,SnowY,SnowW,SnowH){
  //Snow on the ground
  fill(255,255,255);
  arc(SnowX,SnowY,SnowW,SnowH, PI, PI+PI);
}

function ShouldISnow(){
  //if(mouseIsPressed){
    test=test*-1;
  //}

}

function mouseClicked() {
  test = test *= -1
}

function ShowandMoveSnow(){
  if(test<0){
    for (let i=0; i<40; i++){
      snow[i].move();
      if(snow[i].intersects()){
      snow[i].show();      
      }
    }
  }
}

function Text(){
  fill(255);
  if(test>0){
    text('Try to click your mouse!', 300, 550);
  }
  else{
    text('~WOOOOOOOOOOOOW~',300,470);
  }
}