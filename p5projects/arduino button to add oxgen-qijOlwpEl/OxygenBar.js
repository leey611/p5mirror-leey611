class OxygenBar {
  constructor(posX, posY, barWidth, barHeight) {
    this.posX = posX
    this.posY = posY
    this.barWidth = barWidth
    this.barHeight = barHeight
  }
  
  update() {
    if (this.barHeight >= 160) this.barHeight = 160
    if (this.barHeight <= 0)  this.barHeight = 0
    if(this.barHeight >0)this.barHeight -= 0.5
  }
  
  addOxygen() {
    //if (this.barHeight >= 160) this.barHeight = 160
    //if (this.barHeight <= 0)  this.barHeight = 0
    this.barHeight += 2
  }
  
  show() {
    push()
    translate(this.posX, this.posY)
    scale(1, -1)
    fill('#ffffff')
    rect(0, 0, this.barWidth, this.barHeight)
    pop()
  }
  
  
}