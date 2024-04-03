class Button {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.btnD = 50
    this.clr = '#ffffff'
  }
  
  update() {
    this.clr = this.isHover() ? '#ffff00' : '#ffffff'
  }
  
  // addOxygen(oxygenBar) {
  //   if (this.isHover()) {
  //     console.log('add ox')
  //     console.log(oxygenBar.barHeight)
  //   }
  // }
  
  show() {
    fill(this.clr)
    circle(this.posX, this.posY, this.btnD)
  }
  
  isHover() {
    return dist(mouseX, mouseY, this.posX, this.posY) < this.btnD/2
  }
}