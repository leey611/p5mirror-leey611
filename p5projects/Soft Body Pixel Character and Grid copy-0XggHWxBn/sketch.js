// 改編自Coding Train / Daniel Shiffman: https://thecodingtrain.com/challenges/177-soft-body-character

// 引入物理引擎函式庫(Toxiclibs.js)
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;
let particles = []; // 存取點點們的變數
let springs = []; // 存取連結線們的變數

let shapeGraphic; // 畫shape的圖層
let quadrantDiagramGraphic; // 畫像線圖的圖層
let webGLGraphic; // 畫webGL效果的圖層
let pixelShader; // 畫套用的shader(這邊為pixel)效果

let screenShotBtn; // 存取圖片的按鈕
let modeSelect; // 選擇直線或曲線的選單
let bodyColorPicker; // 選擇身體/shape的填色的color picker
let bodyStrokeColorPicker; // 選擇身體邊框顏色的color picker
let backgroundColorPicker; // 選擇背景色的color picker
let textColorPicker; // 選擇文字,象限線條顏色的color picker
let strokeWeightSlider; // 調整邊框粗細的slider
let pixelSliderX; // 調整X軸方向的pixel效果
let pixelSliderY; // 調整Y軸方向的pixel效果
let showGrid; // 勾選是否顯示像線圖
let showSprings; // 勾選是否顯示連結線
let showShapePoints; // 勾選是否顯示shape的點點及編號
let showShape; // 勾選是否顯示形狀

// 提早讀取
function preload() {
  pixelShader = loadShader("shader.vert", "shader.frag");
}

// p5的環境設置
function setup() {
  createCanvas(800, 800); // 新增一個800x800的canvas
  shapeGraphic = createGraphics(width, height); // 宣告shapeGraphic圖層
  quadrantDiagramGraphic = createGraphics(width, height); // 宣告quadrantDiagramGraphic圖層
  webGLGraphic = createGraphics(width, height, WEBGL); // 宣告webGLGraphic圖層, 且為webGL模式

  screenShotBtn = createButton("存取圖片"); // 宣告名為存取圖片的按鈕
  screenShotBtn.mousePressed(() => saveCanvas("myCanvas", "jpg")); // 當滑鼠按下screenShotBtn時, 下載Canvas
  modeSelect = createSelect(); // 宣告一個選單
  modeSelect.option("直線"); // 新增直線選項給這個選單
  modeSelect.option("曲線"); // 新增曲線選項給這個選單
  bodyColorPicker = createColorPicker("#fff"); // 宣告color picker, 預設顏色為#fff
  bodyStrokeColorPicker = createColorPicker("#ff00ff"); // 宣告color picker, 預設顏色為#ff00ff
  backgroundColorPicker = createColorPicker("#fff"); // 宣告color picker, 預設顏色為#fff
  textColorPicker = createColorPicker("#000"); // 宣告color picker, 預設顏色為#000
  strokeWeightSlider = createSlider(2, 20, 4, 1); // 宣告slider, 最小值2, 最大值20, 預設值4, 增減的步數為1
  pixelSliderX = createSlider(0.1, 1, 1, 0.1); // 宣告slider, 最小值0.1, 最大值1, 預設值1, 增減的步數為0.1
  pixelSliderY = createSlider(0.1, 1, 1, 0.1); // 宣告slider, 最小值0.1, 最大值1, 預設值1, 增減的步數為0.1
  showShape = createCheckbox("顯示shape", false); // 宣告名為顯示shape的checkbox, 預設值為否
  showGrid = createCheckbox("顯示象限", true); // 宣告名為顯示象限的checkbox, 預設值為是
  showShapePoints = createCheckbox("顯示連結點", true); // 宣告名為顯示連結點的checkbox, 預設值為是
  showSprings = createCheckbox("顯示連結線", false); // 宣告名為顯示連結線的checkbox,預設值為否

  physics = new VerletPhysics2D();

  let bounds = new Rect(-width / 2, -height / 2, width, height);
  physics.setWorldBounds(bounds);

  // 依序存入各個點點及其座標
  
  // particles.push(new Particle(0, 0, "🗒️")) // 筆記本
  // particles.push(new Particle(-300, -300, "💍")) // 銀戒指
  // particles.push(new Particle(350, 0, "%")) //蛋黃派
  // particles.push(new Particle(-400, 400, "📱")) //手機殼
  // particles.push(new Particle(213, -25, "@")) // 眼鏡盒
  // particles.push(new Particle(50, -350, "!")) //陶瓷杯
  // particles.push(new Particle(350, 150, "3")) //線香
  // particles.push(new Particle(50, 100, "✏️")) //繪圖筆
  // particles.push(new Particle(110, -116, "🍼")) //水壺
  // particles.push(new Particle(350, -350, "@")) //粉紅水晶柱
  // particles.push(new Particle(-200, -400, "🎒")) //辣包
  
  // particles.push(new Particle(-250, -200)); // 0 號點點: 位置(-150, -100)
  // particles.push(new Particle(-100, -50)); // 1 號點點: 位置(-20, -50)
  // particles.push(new Particle(180, -180)); // 2 號點點: 位置(80, -80)
  // particles.push(new Particle(130, 20)); // 3 號點點: 位置(30, 20)
  // particles.push(new Particle(180, 120)); // 4 號點點: 位置(80, 120)
  // particles.push(new Particle(-120, 0)); // 5 號點點: 位置(-20, 80)
  // particles.push(new Particle(-300, 200)); // 6 號點點: 位置(-120, 120)
  // particles.push(new Particle(-250, 0)); // 7 號點點: 位置(-70, 20)
  
  particles.push(new Particle(-120, -80));
  particles.push(new Particle(-70, -80));
  particles.push(new Particle(-20, -80));
  particles.push(new Particle(30, -80));
  particles.push(new Particle(80, -80));
  particles.push(new Particle(30, 20));
  particles.push(new Particle(80, 120));
  particles.push(new Particle(30, 120));
  particles.push(new Particle(-20, 120));
  particles.push(new Particle(-70, 120));
  particles.push(new Particle(-120, 120));
  particles.push(new Particle(-70, 20));

  // 將點點們彼此新增soft body的連結線
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (i !== j) {
        let a = particles[i];
        let b = particles[j];
        // let b = particles[(i + 1) % particles.length];
        springs.push(new Spring(a, b, 0.001));
      }
    }
  }
}

// p5 canvas每一個frame在做的事
function draw() {
  //clear()
  webGLGraphic.shader(pixelShader);
  pixelShader.setUniform("mouse", [pixelSliderX.value(), pixelSliderY.value()]);
  pixelShader.setUniform("tex", shapeGraphic);
  webGLGraphic.rect(-width / 2, -height / 2, width, height);

  shapeGraphic.background(255);

  image(webGLGraphic, 0, 0);

  if (showShape.checked()) {
    // 如果有勾選showShape
    drawShape(shapeGraphic); // 在shapeGraphic圖層畫形狀
  }

  if (showGrid.checked()) {
    // 如果有勾選showGrid
    drawGrid(quadrantDiagramGraphic); // 在quadrantDiagramGraphic畫像線圖
  }

  if (showSprings.checked()) {
    // 如果有勾選showSprings
    drawSprings(quadrantDiagramGraphic); // 在quadrantDiagramGraphic畫連結線
  }

  if (showShapePoints.checked()) {
    // 如果有勾選showShapePoints
    drawShapePoints(quadrantDiagramGraphic); //在quadrantDiagramGraphic標註點點們
  }
}

// 在放入函示的graphic上畫shape
function drawShape(g) {
  g.background(backgroundColorPicker.color());
  g.push();
  g.translate(width / 2, height / 2);
  physics.update();

  g.stroke(bodyStrokeColorPicker.color());
  if (showSprings.checked())
    g.stroke([
      red(bodyStrokeColorPicker.color()),
      green(bodyStrokeColorPicker.color()),
      blue(bodyStrokeColorPicker.color()),
      100,
    ]);

  g.fill(bodyColorPicker.color());

  if (showSprings.checked())
    g.fill([
      red(bodyColorPicker.color()),
      green(bodyColorPicker.color()),
      blue(bodyColorPicker.color()),
      100,
    ]);

  g.strokeWeight(strokeWeightSlider.value());

  if (modeSelect.value() === "直線") {
    g.beginShape(); // 開始將點點們變成Shape
    for (let particle of particles) {
      g.vertex(particle.x, particle.y);
    }
    g.endShape(CLOSE);
  }

  if (modeSelect.value() === "曲線") {
    g.beginShape();
    for (let p of particles) {
      g.curveVertex(p.x, p.y);
    }
    g.curveVertex(particles[0].x, particles[0].y);
    g.curveVertex(particles[1].x, particles[1].y);
    g.curveVertex(particles[2].x, particles[2].y);
    g.endShape();
  }

  if (mouseIsPressed) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      particles[0].lock();
      particles[0].x = mouseX - width/2;
      particles[0].y = mouseY - height/2;
      particles[0].unlock();
    }
  }
  g.pop();
}

// 在放入的graphic上畫像線圖
function drawGrid(graphic) {
  graphic.clear(); //background("yellow")

  graphic.push();
  // graphic.textAlign(LEFT, TOP)
  graphic.stroke(textColorPicker.color());
  graphic.strokeWeight(1);
  graphic.fill(textColorPicker.color());
  graphic.translate(width / 2, height / 2);
  graphic.line(-width / 2, 0, width / 2, 0); // X軸
  graphic.line(0, -height / 2, 0, height / 2); // Y軸
  graphic.textSize(12);
  graphic.noStroke();
  for (let x = -width / 2; x < width / 2; x += 50) {
    graphic.line(x, 0, x, 5);
    graphic.text(x, x, 10);
  }

  for (let y = -height / 2; y < height / 2; y += 50) {
    graphic.line(0, y, 5, y);
    graphic.text(y, 0, y);
  }
  graphic.push();
  graphic.textAlign(RIGHT);
  graphic.text("Release釋放", width / 2, 0);
  graphic.textAlign(LEFT);
  graphic.text("Protect保護", -width / 2, 0);
  graphic.text("Collect收納", 0, height / 2);
  graphic.textAlign(LEFT, TOP);
  graphic.text("Action行動", 0, -height / 2);
  graphic.pop();

  graphic.pop();

  image(graphic, 0, 0);
}

// 在放入的graphic上畫點點和編號
function drawShapePoints(graphic) {
  graphic.clear();
  graphic.push();
  graphic.translate(width / 2, height / 2);
  particles.forEach((particle, index) => {
    graphic.push();
    //graphic.strokeWeight(5)
    //graphic.point(particle.x, particle.y)
    graphic.noFill();
    graphic.stroke(textColorPicker.color());
    //graphic.circle(particle.x, particle.y, 15);
    graphic.fill(textColorPicker.color());
    graphic.noStroke();
    graphic.textSize(15);
    graphic.textAlign(CENTER, CENTER);
    graphic.text(index, particle.x, particle.y);
    graphic.pop();
  });
  graphic.pop();
  image(graphic, 0, 0);
}

// 在放入的graphic上畫連結線
function drawSprings(graphic) {
  graphic.clear();
  graphic.push();
  graphic.translate(width / 2, height / 2);
  // graphic.stroke([
  //     red(bodyStrokeColorPicker.color()),
  //     green(bodyStrokeColorPicker.color()),
  //     blue(bodyStrokeColorPicker.color()),
  //     100]
  //   );

  for (let spring of springs) {
    graphic.stroke(textColorPicker.color());
    graphic.strokeWeight(1);
    spring.show(graphic);
  }

  graphic.pop();
  image(graphic, 0, 0);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("myCanvas", "jpg");
  }
  return false;
}
