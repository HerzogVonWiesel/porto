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
let tick;
let mouseX;
let mouseY;
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
let dark_bg = "#200F00";
let dark_stroke = "black";
let bright_stroke = "white";
let bg = bright_bg;
let stroke=dark_stroke;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')).matches) {
    bg=dark_bg;
    stroke=bright_stroke;
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
}
  
document.addEventListener("color_change", change_color, false);

//////f=flowfield, p=particle, w=waves

//setup for particles(size=12) and flowfield(size=30)
function setup(sizer=30) { //fp
  size = sizer;
  noiseZ = 0;
  noise.seed(Math.random());
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
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
        let v = new Vector(0, length*10.0);
        v.setAngle(angle);
        field[x][y] = v;
    }
    }
}

function drawBackground(alpha) {
    ctx.fillStyle = convertHexToRGBA(bg, alpha);
    ctx.fillRect(0, 0, w, h);
}

function reset() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    w = canvas.width = canvas.offsetWidth;//window.innerWidth;
    h = canvas.height = canvas.offsetHeight;//window.innerHeight;
    noise.seed(Math.random());
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    drawBackground(1);
    initParticles();
    initField();
}

function fdraw() {
  requestAnimationFrame(draw);
  fcalculateField();
  noiseZ += 0.003;
  drawBackground(0.3);
  drawField();
}

function pdraw() {
    requestAnimationFrame(draw);
    pcalculateField();
    noiseZ += 0.002;
    drawBackground(0.01);
    drawParticles();
}

let timer;
let cases = 0;
function draw() {
    if(!timer)
        timer = Date.now();
    else if (Date.now() - timer > 3000){
        timer = null;
        cases = (cases+1) % 2;
        if(cases == 0){
            clear();
            setup(30);
        }
        if(cases == 1){
            clear();
            setup(8);
        }
        
    }
    switch (cases){
        case 0:
            fdraw();
            break;
        case 1:
            pdraw();
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
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.0;
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
    let hue = Math.sin(noiseZ) * 30;
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

setup(30);
draw();