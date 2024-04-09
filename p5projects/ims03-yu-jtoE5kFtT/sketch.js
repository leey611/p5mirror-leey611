let my = {};

let palette = "c2f970-44344f-564d80-98a6d4-d3fcd5"
  .split("-")
  .map((a) => "#" + a);
let inc = 0.05;
let scl = 10;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;
const golden_ratio_conjugate = 0.618033988749895;
let h = Math.random();

let urlParams

function setup() {
  my.width = 900;
  my.height = 900;
  my.xpos = 0;
  my.ypos = 0;
  my.xspeed = 1;
  my.yspeed = 1;
  // my.xlen = 0;
  // my.ylen = 0;
  my.debug = 1;
  // my.fullScreenBtn = 0;
  my.startTime = 0;
  my.changeTime = 1.0;
  
  urlParams = get_url_params();
  
  console.log('urlParams', urlParams);

  if (!my.debug) {
    my.width = windowWidth;
    my.height = windowHeight;
  }
  createCanvas(my.width, my.height);
  //noStroke();
  makeNewFlowField()

  my.fullScreenBtn = createButton("Full Screen");
  my.fullScreenBtn.mousePressed(full_screen_action);
  my.fullScreenBtn.style("font-size:42px");

  my.startTime = millis() / 1000.0;

  new_pos();

  // init_dim();
}

function draw() {
  let yoff = 0;
  // describe("Initialize y offset for noise, making the particles move by time.");
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let r = noise(xoff, yoff) * 255;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let cir = TWO_PI;
      let mapAng = map(angle, 0, cir * 2, -cir, cir);
      let v = p5.Vector.fromAngle(mapAng);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      // push()
      // translate(x*scl, y*scl)
      // rotate(v.heading())
      // line(0,0,scl,0)
      // pop()
      //fill(r)
      //rect(x*scl, y*scl, scl, scl)
    }
    yoff += inc;
    zoff += 0.0005;
  }
  // describe(
  //   "Loop through rows and columns and store vector in flowfield array, meaning that accessibility help knowledge spread freely."
  // );

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    //particles[i].edges()
    particles[i].show(i);
  }
  // describe("Update and display particles");
}

function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log('query.length', query.length);
  if (query.length < 1) return null;
  let params = params_query(query);
  return params;
  // let store = params['store'];
  // console.log('nstore', store);
  // return store;
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}

function new_pos() {
  my.xpos = random(0, width);
  my.ypos = random(0, height);
}

function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
    new_pos();
  }
}

// function init_dim() {
//   xlen = width / 3;
//   ylen = height;
// }

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF

function full_screen_action() {
  my.fullScreenBtn.remove();
  fullscreen(1);
  let delay = 3000;
  h = Math.random()
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  background("#c3c3c3");
  if (urlParams?.v) background("#000");
    
  h = Math.random()
  //setInterval(makeNewFlowField,5000)
  makeNewFlowField()
  setInterval(makeNewFlowField,15000)
}

function makeNewFlowField(newH) {
  background("#c3c3c3");
  if (urlParams?.v) background("#000");
  strokeCap(SQUARE);
  cols = floor(width / scl);
  rows = floor(height / scl);
  
  flowfield = new Array(cols * rows);
  h = Math.random()
  // describe("Initialize flowfield array");
  particles = []
  for (let i = 0; i < 2000; i++) {
    if (random() > 0.8) {
      h += golden_ratio_conjugate;
      h %= 1;
      particles.push(new Particle(getNewVec()));
    } else if (random() < 0.1) {
      particles.push(new Particle());
    }
  }
}

const dia = 350;
function getNewVec() {
  // describe(
  //   "Function to get a new random vector within a circular area, symbolizing that time and knowledge will grow forever."
  // );
  let vec = createVector(random(width), random(height));
  if (dist(width / 2, height / 2, vec.x, vec.y) < dia) {
    return vec;
  }
  return getNewVec();
}

function Particle(pos) {
  this.pos = pos || createVector(random(width), random(height));
  this.vel = createVector(0, 0); //p5.Vector.random2D()//
  this.acc = createVector(0, 0);
  this.sw = random() > 0.1 ? random(1, 4) : random(40);
  this.clr = urlParams?.v ? color(random(['red', 'green', [187, 165, 61], 'black'])) : color(...hsvToRgb(h, 0.6, 0.95));
  this.maxspeed = 1.3;

  // describe(
  //   "Particle object constructor: Set stroke weight and color. Different attributes of the particles manifest diversity."
  // );

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.sw > 5) {
      this.sw *= 0.99;
    }
  };

  this.follow = function (vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.show = function (index) {
    push();
    translate(this.pos.x, this.pos.y);
    //rotate(this.vel.heading())
    stroke(this.clr);
    strokeWeight(this.sw)
    //strokeWeight(this.sw)
    point(0, 0);
    //rect(0,0,10,10)

    pop();
    //stroke(this.clr)
    //stroke(palette[index%palette.length])

    // fill(this.clr)
    // rect(this.pos.x, this.pos.y, 10, 10)
  };

  this.edges = function () {
    // if (this.pos.x > width) this.pos.x = 0
    // if (this.pos.x < 0) this.pos.x = width
    // if (this.pos.y > height) this.pos.y = 0
    // if (this.pos.y < 0) this.pos.y = height
    if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > dia) {
      this.pos = getNewVec();
    }
  };
}

function hsvToRgb(h, s, v) {
  // describe("Function to convert HSV color to RGB color");
  let h_i = Math.floor(h * 6);
  let f = h * 6 - h_i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  let r, g, b;

  if (h_i === 0) {
    r = v;
    g = t;
    b = p;
  }
  if (h_i === 1) {
    r = q;
    g = v;
    b = p;
  }
  if (h_i === 2) {
    r = p;
    g = v;
    b = t;
  }
  if (h_i === 3) {
    r = p;
    g = q;
    b = v;
  }
  if (h_i === 4) {
    r = t;
    g = p;
    b = v;
  }
  if (h_i === 5) {
    r = v;
    g = p;
    b = q;
  }

  return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
}

function mousePressed() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    if (random() > 0.1) {
      particles.push(new Particle());
    }
  }
  // describe("Function to regenerate particles on mouse click");
}

// https://editor.p5js.org/jht9629-nyu/sketches/8Iazn1D_P
// ims black-n white-1

// https://editor.p5js.org/jht9629-nyu/sketches/3VKJ-q8ar
// ims03-jht scrolling color bars

// forked and modified from 
// https://editor.p5js.org/leey611/sketches/T5zVm6jEl
// ims02-yu