class Snow{
  constructor(){
    this.x=random(0,600);
    this.y=random(0,600);
  }
  move(){
    this.x+=random(-5,+5);
    this.y+=2+random(-1,+1);
    if(this.y>600){
      this.y=0;
      this.x=random(0,600);
    }
  }
  show(){
    fill(255,200);
    noStroke();
    circle(this.x,this.y,10);
  }
  intersects(){
    let d=dist(this.x,this.y,300,280);
    if (d<225){
      return true;
    }
    else{
      return false;
    }
  }
}