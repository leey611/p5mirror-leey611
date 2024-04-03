/* global PIXI, SMALL_CANVAS_SIZE, LARGE_CANVAS_SIZE, BG_COLOR_HEXCODE, resizeWithCSS  resizeWithCSSPixelated */

function pixiRender(parentID, resizeCallback) {
  let parent = document.getElementById(parentID);
  let s = SMALL_CANVAS_SIZE
  let app = new PIXI.Application({
    width: s,
    height: s,
  });

  PIXI.settings.RESOLUTION = window.devicePixelRatio;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
  parent.appendChild(app.view);
  
  let obj = new PIXI.Graphics();
  
  obj.beginFill(BG_COLOR_HEXCODE);
  obj.drawRect(0, 0, s, s);
  obj.endFill();
  
  obj.lineStyle(1, 0x000000);
  obj.drawCircle(s/2, s/2, s/4);
  obj.drawCircle(s/2, s/2, s/8);

  
  const path = [0,s/2, s/2, 0, s, s/2, s/2, s];
  obj.drawPolygon(path);
  
  // Add it to the stage to render
  app.stage.addChild(obj);
  
  if (resizeCallback) {
    
    resizeCallback(app.view);
  }
}

pixiRender("pixi-1");
pixiRender("pixi-2", resizeWithCSS);
pixiRender("pixi-3", resizeWithCSSPixelated);
