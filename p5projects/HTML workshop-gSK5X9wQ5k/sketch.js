let mySlider
let myText
let textBox
let myButton

// Dave: select scrollable list
// attribute('size', 4)
function setup() {
  createCanvas(400, 400);
  
  // create HTML elements
  mySlider = createSlider(12, 100, 24)
  myText = createP('hello')
  textBox = createInput('type things here')
  myButton = createButton('Enter')
  
  // initialize events
  textBox.input(changeText)
  mySlider.changed(changeTextSize)
  myButton.mousePressed(changeTextColor)
  myButton.mouseOver(changeBtnBackground)
  myButton.mouseOut(setWhiteBackground)
  
  // select HTML elements
  let bigText = select('#big_text')
  bigText.style('font-size', '36px')
  let blueText = selectAll('.blue')
  for(let i = 0; i < blueText.length; i++) {
    blueText[i].style('color', 'blue')
  }
  let paragraphs = selectAll('.paragraph')
  for(let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(setUnderline)
    paragraphs[i].mouseOut(removeUnderline)
  }
}

function draw() {
  background(220);
  text(myText.html(), width/2, height/2)
}

function changeText() {
  myText.html(textBox.value())
}

function changeTextSize() {
  myText.style('font-size', mySlider.value() + 'px')
}

function changeTextColor() {
  let r = random(255)
  let g = random(255)
  let b = random(255)
  myText.style('color',
               'rgb(' + r + ',' + g + ',' + b + ')'
              )
  // short cut writing multiple variables and strings together
  //myText.style('color', `rgb(${r}, ${g}, ${g})`)
}

function changeBtnBackground() {
  let r = random(255)
  let g = random(255)
  let b = random(255)
  myButton.style('background-color' , 'rgb(' + r + ',' + g + ',' + b + ')')
}

function setWhiteBackground() {
  myButton.style('background-color' , 'white')
}

function setUnderline() {
  this.style('text-decoration', 'underline')
}

function removeUnderline() {
  this.style('text-decoration', 'none')
}