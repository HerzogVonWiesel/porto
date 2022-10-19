//flowfield
let canvas;
let ctx;
let field;
let w, h;
let size;
let columns;
let rows;
let noiseZ;
//noisewaves
let unit = 100;
let xAxis = 0;
let yAxis;
//flowparticles
let particles;
class Particle {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(Math.random() - 5.5, Math.random() - 5.5);
        this.acc = new Vector(0, 0);
        this.size = 1;
    }
    
    move(acc) {
        if(acc) {
            this.acc.addTo(acc);
        }
        this.vel.addTo(this.acc);
        this.pos.addTo(this.vel);
        if(this.vel.getLength() > 1) {
            this.vel.setLength(1);
        }
        this.acc.setLength(0);
    }
    
    draw() {
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
    
    wrap() {
        if(this.pos.x > w) {
            this.pos.x = 0;
        } else if(this.pos.x < -this.size) {
            this.pos.x = w - 1;
        }
        if(this.pos.y > h) {
            this.pos.y = 0;
        } else if(this.pos.y < -this.size) {
            this.pos.y = h - 1;
        }
    }
}

const convertHexToRGBA = (hexCode, opacity = 1) => {  
    let hex = hexCode.replace('#', '');
    
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }    
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;   
    }

    return `rgba(${r},${g},${b},${opacity})`;
};

/////GLOBALS
let bright_bg = "#fff7ed";
let dark_bg = "#000000";
let dark_stroke = "black";
let bright_stroke = "white";
let bg = bright_bg;
let stroke=dark_stroke;

let timer;
let cases = -1;
canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
window.addEventListener("resize", resetCanvas);

size=30;
resetCanvas();

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')).matches) {
    change_color();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { 
    change_color();
})

function change_color() {
    if (stroke==dark_stroke){
        bg=dark_bg;
        stroke=bright_stroke;
    }
    else{
        bg=bright_bg;
        stroke=dark_stroke;
    }
    resetDrawing();
}
  
document.addEventListener("color_change", change_color, false);

//////f=flowfield, p=particle, w=waves

//setup for particles(size=12) and flowfield(size=30)
function setup(sizer=30) { //fp
    size = sizer;
    noiseZ = 0;
    noise.seed(Math.random());
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.0;
    initDatafields();
}

function initField() { //f
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for (let y = 0; y < rows; y++) {
      field[x][y] = [0, 0];
    }
  }
}

function initParticles() { //p
    particles = [];
    let numberOfParticles = w * h / 100;
    for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
    }
}

function fcalculateField() { //f
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let angle = noise.simplex3(x / 50, y / 50, noiseZ) * Math.PI * 2;
      let length = noise.simplex3(x / 50 + 40000, y / 50 + 40000, noiseZ);
      field[x][y][0] = angle;
      field[x][y][1] = Math.abs(length);
    }
  }
}

function pcalculateField() { //p
    field = new Array(columns);
    for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
        let angle = noise.simplex3(x/20, y/20, noiseZ) * Math.PI * 2;
        let length = noise.simplex3(x/50 + 40000, y/50 + 40000, noiseZ) * 0.3;
        let v = new Vector(0, length*5.0);
        v.setAngle(angle);
        field[x][y] = v;
    }
    }
}

function drawBackground() {
    ctx.fillRect(0, 0, w, h);
}

function resetCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    w = canvas.width = canvas.offsetWidth;//window.innerWidth;
    h = canvas.height = canvas.offsetHeight;//window.innerHeight;
    yAxis = Math.floor(h/2);
    resetDrawing();
}

function initDatafields(){
    noise.seed(Math.random());
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    initParticles();
    initField();
}

function fdraw() {
  requestAnimationFrame(draw);
  fcalculateField();
  noiseZ += 0.003;
  drawBackground();
  drawField();
}

function pdraw() {
    requestAnimationFrame(draw);
    pcalculateField();
    noiseZ += 0.002;
    ctx.fillStyle = convertHexToRGBA(bg, 0.02);
    drawBackground();
    drawParticles();
}

function wdraw() {
    requestAnimationFrame(draw);
    drawBackground();
    noiseZ += 0.002;
    for(let i = -10; i < 10; i++){
        drawSine(noiseZ, i);
    }
}

function resetDrawing() {
    if(cases == 0){
        setup(30);
        clear();
        ctx.fillStyle = convertHexToRGBA(bg, 0.25);
    }
    if(cases == 1){
        setup(8);
        clear();
    }
    if(cases == 2){
        clear();
        ctx.fillStyle = convertHexToRGBA(bg, 0.25);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
    }
}
function draw() {
    if(!timer){
        timer = Date.now();
    }
    if (Date.now() - timer > 3000 || cases == -1){
        timer = null;
        cases = (cases+1) % 3;
        resetDrawing();
    }
    switch (cases){
        case 0:
            fdraw();
            break;
        case 1:
            pdraw();
            break;
        case 2:
            wdraw();
            break;
    }   
    
}

function clear() {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
}

function drawField() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let angle = field[x][y][0];
      let length = field[x][y][1];
      ctx.save();
      ctx.translate(x * size, y * size);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, size * length + 10);
      ctx.lineTo(-9, (size * length + 10)-9);
      ctx.moveTo(0, size * length + 10);
      ctx.lineTo(9, (size * length + 10)-9);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawParticles() {
    ctx.fillStyle = stroke;
    particles.forEach(p => {
    p.draw();
    let pos = p.pos.div(size);
    let v;
    if(pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
        v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v);
    p.wrap();
    });
}

function drawSine(t, offset_y) {
    var x = t;
    var y = Math.sin(x)
    ctx.moveTo(yAxis, unit*y+xAxis);
    ctx.beginPath();
    // Loop to draw segments
    for (i = xAxis-1; i <= w; i += 2) {
        x = t+(-xAxis+i)/unit;
        y = Math.sin(x+10*noise.simplex3(0, offset_y/30, noiseZ))+offset_y/3;
        ctx.lineTo(i, unit*y+yAxis+(30*noise.simplex3(i, 0, noiseZ)*noise.simplex3(x/3, 10, noiseZ)));
    }
  ctx.stroke();  
}

clear();
draw();