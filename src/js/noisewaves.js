var canvas;
var ctx;
var w;
var h;
var tick;
var mouseX;
var mouseY;

function setup() {
  noise.seed(Math.random());
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  tick = 0;
  //canvas.addEventListener("mousemove", onMouseMove);
  //canvas.addEventListener("click", onClick);
  mouseX = 0;
  mouseY = 0;
}

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function onClick() {
  noise.seed(Math.random());
}

function draw(now) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  requestAnimationFrame(draw);
  waves();
  tick = now / 3000;
}

function wave(y0) {
  var mx = mouseX/500;
  var my = mouseY/500;
  var a = 20 + noise.perlin2(mx + 100+tick, my + y0/100+tick) * 100;
  var p = 20 + noise.perlin2(1000+tick, my + y0/100+tick) * 5;
  var phase = noise.perlin2(mx + 2000+tick, my + y0/100+tick) * 5;
  ctx.beginPath();
  var randadd = 0;
  for(var x = 0; x < w; x++) {
     randadd = (noise.simplex2(x/5, phase)*noise.simplex2(x/120, phase))*20;
    var y = Math.sin(x/w*p + phase) * a + y0 + randadd;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function waves() {
  for(var y0 = 0; y0 < h; y0 += 10) {
    wave(y0);
  }
}

setup();
draw(1);

