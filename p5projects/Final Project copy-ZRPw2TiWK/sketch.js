//array
let faces=[];


function setup() {
  createCanvas(550, 400);
  for (let i=0; i<5; i++) {
    faces.push ( new Face (random(width), random(height),"#FFFF00", random(["happy","frown"])));
  }
}

function draw() { 
     background(0);
    
  ////FACES
//   //happy face
// ellipse (96, 146, 155, 155);
//   //hf eyes
// ellipse(56, 132, 25, 25);
// ellipse(126, 132, 25, 25);

// //SMILE
//    arc(100, 180, 50, 40, 18, PI + QUARTER_PI, CHORD);
//   //sad face 
//   ellipse (410, 146, 155, 155)
//   //sf eyes
// ellipse(446, 132, 25, 25);
// ellipse(370, 132, 25, 25);
//     arc(400, 155, 100, 70, 20, HALF_PI);
  
    //draw new face
  for(let i=0; i<5; i++) {
    // faces[i].draw()
    
    //faces[i].startMotion()
    faces[i].move()
    faces[i].show()
  }
//   for (let i=0; i < 5000, i++;){
//     faces[i].draw();
  
    
//     //faces move  
//     faces[i].move ();
    
//    //faces are this color  
//     fill(this.c);

}


  
function mousePressed () {
  for (let i=0; i<5; i++){
    faces [i].startMotion (random (-10, 10), random (-10, 10))
  }
}
  
  
class Face {
  constructor (ax,ay,ac, faceType){
  this.x = ax;
  this.y = ay;
  this.c = ac;
  this.faceType = faceType
  this.xspeed = random(3);
  this.yspeed = random(2);
  }
  
  show() {
    push()
    translate(this.x, this.y)
    // face
    fill(this.c)
    circle(0, 0, 50)
    
    // if faceType === "happy", draw happy face
    if (this.faceType === "happy") {
      //left eye
      fill(0)
      circle(-10,-5,10)
      
      //right eye
      fill(0)
      circle(10, -5, 10)
    } else {
      //left eye
      fill(255)
      circle(-10,-5,10)
      
      //right eye
    }
    
    pop()
    // else, draw frown face
  }
  
  startMotion (xspeed, yspeed){
    this.xspeed=xspeed;
    this.yspeed = yspeed;
  }
  
  move (){
    this.x = this.x + this.xspeed;
    if ((this.x>width) || (this.x <0 )){
      this.xspeed*=-1; 
    }
      
    this.y=this.y+this.yspeed;
    if ((this.y>height) || (this.y <0 )){
      this.yspeed*=-1;
    }
  }
  
  // a method that check collision, 
  // if two balls collide
  // push a new ball to your faces array
  // https://www.youtube.com/watch?v=uAfw-ko3kB8


  
  
    
  }

