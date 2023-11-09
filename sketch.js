let dots = [];
let currentIndex = 0;

let lastPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let dotSize = 4;

let osc, playing, freq, amp;

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  connect(px, py) {
    // stroke(255, 255, 255);
    stroke(0, 0, 0);
    line(this.x, this.y, px, py);
  }

  plot() {
    // fill(255, 255, 255);
    // stroke(255, 255, 255);
    fill(0, 0, 0);
    stroke(0, 0, 0);
    strokeWeight(1);
    ellipse(this.x, this.y, dotSize);
  }

  within(px, py) {
    let d = dist(px, py, this.x, this.y);
    let isWithin = d < dotSize;
    return isWithin;
  }
}

let monoSynth;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(playOscillator);
  osc = new p5.Oscillator("sine");
}

function draw() {
  // background(3, 53, 115);
  background(255, 255, 255);

  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].plot();
    if (i > 0) {
      dots[i].connect(dots[i - 1].x, dots[i - 1].y);
    }
  }

  if (currentIndex == 0) {
    // fill(255, 255, 255);
    // stroke(255, 255, 255);
    fill(0, 0, 0);
    stroke(0, 0, 0);
    textSize(24);
  } else {
    // stroke(255, 255, 255);
    stroke(0, 0, 0);
    strokeWeight(1);
    line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  currentPos.x = mouseX;
  currentPos.y = mouseY;
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  console.log("presionando");

  currentPos.x = mouseX;
  currentPos.y = mouseY;
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  currentPos.x = mouseX;
  currentPos.y = mouseY;

  dots.push(new Dot(mouseX, mouseY));
  currentIndex++;
  lastPos.x = mouseX;
  lastPos.y = mouseY;
  playing = false;
}
