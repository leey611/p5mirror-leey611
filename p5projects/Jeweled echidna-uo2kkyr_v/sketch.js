let myText
let textBox
let myButton
let mySlider

let sel


function setup() {
  createCanvas(400, 400);
  textBox = createInput('hello')
  myText = createP('hello')//textBox.value()
  textBox.changed(changeText)
  
  myButton = createButton('myButton')
  myButton.mousePressed(changeText)
  myButton.mousePressed(addOption)
  
  mySlider = createSlider(14, 60, 24)
  mySlider.changed(changeTextSize)
  
  let bigText = select('#big_text')
  bigText.style('font-size', '24px')
  
  let blueText = selectAll('.blue')
  for(let i = 0; i < blueText.length; i++) {
    blueText[i].style('color', 'blue')
  }
  
  let paragraphs = selectAll('p')
  for(let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(setUnderline)
    paragraphs[i].mouseOut(removeUnderline)
  }
  
  sel = createSelect()
  sel.position(10, 10);
  sel.option('pear');
  sel.option('kiwi');
  sel.option('grape');
  sel.selected('kiwi');
  sel.attribute('size', 3)
  sel.changed(addOption);
}

function draw() {
  background(220);
  //text(myText, width/2, height/2)
}

function addOption() {
  sel.option(textBox.value())
}

function changeText() {
  myText.html(textBox.value())
}

function changeTextSize() {
  myText.style('font-size', mySlider.value() + 'px')
}

function setUnderline() {
  this.style('text-decoration', 'underline')
}

function removeUnderline() {
  this.style('text-decoration', 'none')
}

