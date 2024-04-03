/* global p5, SMALL_CANVAS_SIZE, LARGE_CANVAS_SIZE, BG_COLOR_HEX , resizeWithCSS, resizeWithCSSPixelated */


function p5Render(parentID, resizeCallback) {
  let cnv;
  let ctx;
  new p5((p) => {
    p.setup = () => {
      cnv = p.createCanvas(SMALL_CANVAS_SIZE, SMALL_CANVAS_SIZE, 'webgl');
      // console.log(cnv.elt)
      // let testPar = p.createDiv('test')
      // console.log(cnv)
      // testPar.html(cnv.canvas)
      //testPar.html("<p>hi</p>")
      //document.body.appendChild(cnv.elt)
      // cnv.parent(parentID);
      // console.log(cnv.parent())
      // console.log(cnv.elt)
      // let parent = p.createDiv("test")//document.getElementById(parentID)
      // parent.appendChild();
      
      p.noSmooth();
      p.pixelDensity(1);

    };
    p.draw = () => {
     
      p.background(BG_COLOR_HEX);
      p.strokeWeight(1);
      p.translate(-p.width/2, -p.height/2);
      //nested circles
      p.ellipse(p.width / 2, p.height / 2, p.width / 2, p.height / 2);
      p.ellipse(p.width / 2, p.height / 2, p.width / 4, p.height / 4);
      //diamond
      p.line(0, p.height / 2, p.width / 2, 0);
      p.line(p.width / 2, 0, p.width, p.height / 2);
      p.line(p.width, p.height / 2, p.width / 2, p.height);
      p.line(p.width / 2, p.height, 0, p.height / 2);
      
      if (resizeCallback) {
        resizeCallback(cnv.canvas);
      }
      p.noLoop();
      
    };
  });
}

p5Render("p5js-webgl-1");
p5Render("p5js-webgl-2", resizeWithCSS);
p5Render("p5js-webgl-3", resizeWithCSSPixelated);
//p5Render("p5js-webgl-4", 'js');
