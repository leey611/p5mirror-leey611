// import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
// document.body.appendChild(app.view);


var colorSchemes = [
  new ColorScheme("https://coolors.co/5386e4-7fc29b-b5ef8a-d7f171-817e9f"),
];

function ColorScheme(colorString) {
  this.colors = [];
  {
    let cc = colorString.split("/");
    let cs = cc[cc.length - 1].split("-");
    for (let i in cs) {
      let r = parseInt("0x" + cs[i].substring(0, 2));
      let g = parseInt("0x" + cs[i].substring(2, 4));
      let b = parseInt("0x" + cs[i].substring(4, 6));
      this.colors.push(b + g * 256 + r * 256 * 256);
    }
  }
  this.offset = 0;
}

ColorScheme.prototype.get = function (i) {
  i = Math.min(this.colors.length - 1, Math.max(0, i));
  return this.colors[(i + this.offset) % this.colors.length];
}



// create an new instance of a pixi stage
var stage = app.stage;

// stage.setInteractive(true);

//stage.addChild(sprite);
// create a renderer instance
//var renderer = new PIXI.CanvasRenderer(800, 600);//PIXI.autoDetectRenderer(800, 600);
var renderer = PIXI.autoDetectRenderer(620, 380);

// set the canvas width and height to fill the screen
//renderer.view.style.width = window.innerWidth + "px";
//renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";

// add render view to DOM
document.body.appendChild(renderer.view);

// lets create moving shape
var thing = new PIXI.Graphics();
stage.addChild(thing);
thing.position.x = 620 / 2;
thing.position.y = 380 / 2;

var count = 0;

stage.click = stage.tap = function() {
  // graphics.lineStyle(Math.random() * 30, colorSchemes[0].get(1), 1);
  // graphics.moveTo(Math.random() * 620, Math.random() * 380);
  // graphics.lineTo(Math.random() * 620, Math.random() * 380);
}

requestAnimationFrame(animate);

function animate() {

  thing.clear();

  count += 0.1;

  thing.clear();
  thing.lineStyle(30, colorSchemes[0].get(0), 1);
  thing.beginFill(colorSchemes[0].get(1), 0.8);

  thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
  thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
  thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
  thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
  thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);

  thing.rotation = count * 0.1;
  renderer.render(stage);
  requestAnimationFrame(animate);
}
