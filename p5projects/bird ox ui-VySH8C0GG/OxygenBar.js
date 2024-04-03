class OxygenBar {
  constructor(posX, posY, barWidth, barHeight) {
    this.posX = posX
    this.posY = posY
    this.barWidth = barWidth
    this.barHeight = barHeight
  }
  
  update() {
    if(this.barHeight >0)this.barHeight -= 0.5
  }
  
  addOxygen() {
    this.barHeight += 10
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