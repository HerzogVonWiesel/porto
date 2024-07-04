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
let cfield;
let cpolys;
let cr;
let crings;
let dpr_mul;
let particles;
class Particle {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(Math.random() - 5.5, Math.random() - 5.5);
        this.acc = new Vector(0, 0);
        this.size = 1.5;
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

let dpr = 1;

function scaleCanvas(canvas, context, width, height) {
    // Handle window for SSR
    if (typeof window === 'undefined')
        return null;
    // determine the actual ratio we want to draw at
    var ratio = window.devicePixelRatio || 1;
    if (devicePixelRatio !== 1) {
        ratio = ratio / 2;
        dpr = ratio;
        // set the 'real' canvas size to the higher width/height
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        // ...then scale it back down with CSS
        //canvas.style.width = width + 'px';
        //canvas.style.height = height + 'px';
        // scale the drawing context so everything will work at the higher ratio
        console.log("Rescaled Canvas for DPR ", ratio);
        context.scale(ratio, ratio);
    }
}


/////GLOBALS
let bright_bg = getComputedStyle(document.documentElement).getPropertyValue('--bg')
let dark_bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark')
let dark_stroke = getComputedStyle(document.documentElement).getPropertyValue('--base-dark')
let bright_stroke = getComputedStyle(document.documentElement).getPropertyValue('--base-bright')
let bg = bright_bg;
let stroke=dark_stroke;

let timer;
let cases = -1;
canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d", { alpha: false });
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
    field[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      field[x][y] = [0, 0];
    }
  }
}

function initCfield() { //c
    cr = Math.max(canvas.width, canvas.height) * 0.6;
    crings = cr/7;
    dpr_mul = dpr*1.1;
    //rings to int
    crings = Math.floor(crings);
    cfield = new Array(crings);
    cpolys = new Array(crings);
    crad = new Array(crings);
    for (let j = 0; j < crings; j++) {
      crad[j] = (cr / crings) * (crings - j);
      cpolys[j] = (crings+5-j);
      cfield[j] = new Array(cpolys[j]);
      for (let i = 0; i < cpolys[j]; i++) {
            let pre_x = Math.cos(i / cpolys[j] * Math.PI*2) * crad[j] + canvas.width / (2*dpr);
            let pre_y = Math.sin(i / cpolys[j] * Math.PI*2) * crad[j] + canvas.height / (2*dpr);
            cfield[j][i] = new Vector(pre_x, pre_y);
      }
    }
}

// Define a speed factor for the gradual movement (tweak this value as needed)
const movementSpeed = 0.05;

var targetMouseX = 0;
var targetMouseY = 0;

document.addEventListener('mousemove', (event) => {
    var rect = canvas.getBoundingClientRect();

    // Update the target position towards the actual mouse position
    targetMouseX = Math.min((event.clientX - rect.left), rect.width) * dpr;
    targetMouseY = Math.min((event.clientY - rect.top), rect.height) * dpr;
});

// Initialize mouseX and mouseY to be the center of the canvas
var mouseX = canvas.width / 2;
var mouseY = canvas.height / 2;

// Define a function to gradually update the mouseX and mouseY positions
function updateMousePosition() {
    var dx = targetMouseX - mouseX;
    var dy = targetMouseY - mouseY;

    mouseX += dx * movementSpeed;
    mouseY += dy * movementSpeed;

    // Call the function on the next frame to create a smooth animation
    requestAnimationFrame(updateMousePosition);
}

// Start the gradual update of mouseX and mouseY positions
updateMousePosition();

function initParticles() { //p
    particles = [];
    let numberOfParticles = w * h / 1000;
    for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
    }
}

function lerpAngle (A, B, w){
    let CS = (1-w)*Math.cos(A) + w*Math.cos(B);
    let SN = (1-w)*Math.sin(A) + w*Math.sin(B);
    return Math.atan2(SN,CS);
}

function mouseDistance(x, y) {
    var dx = mouseX - x;
    var dy = mouseY - y;
    return Math.sqrt(dx * dx + dy * dy);
}

function mouseAngle(x, y) {
    var dx = mouseX - x;
    var dy = mouseY - y;
    return Math.atan2(dy, dx);
}

function fcalculateField() { //f
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      var dx = mouseX - (canvas.width/columns) * x;
      var dy = mouseY - (canvas.height/rows) * y;
      let angle1 = noise.simplex3(x / 50, y / 50, noiseZ) * Math.PI * 2;
      let angle2 = Math.atan2(dy*10, dx*10) - 1.57;
      let length = noise.simplex3(x / 50 + 40000, y / 50 + 40000, noiseZ);
      //the closer the mouse, the stronger the influence of angle 2; length has nothing to do with this though.
      let d = Math.sqrt(dx * dx + dy * dy)/500;
      let angle = lerpAngle(angle2, angle1, d);
      //console.log(angle1, angle2);
      field[x][y][0] = angle;
      field[x][y][1] = length * 0.5 + 0.5;
    }
  }
}

function ccalculateField() { //p
    let partID = 0;
    for(let x = 0; x < columns; x++) {
        for(let y = 0; y < rows; y++) {
            
            var dx = mouseX - (canvas.width/columns) * x;
            var dy = mouseY - (canvas.height/rows) * y;
            let angle1 = noise.simplex3(x/20, y/20, noiseZ) * Math.PI * 2;
            
            let angle2 = Math.atan2(dy*10, dx*10) - 0;
            
            let angle = angle1 + angle2;
            let length = noise.simplex3(x/50 + 40000, y/50 + 40000, noiseZ) * 0.3;
            let v = new Vector(0, length*5.0);
            v.setAngle(angle);
            pfield[x][y] = v;
            partID++;
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
    scaleCanvas(canvas, ctx, w, h);
    yAxis = Math.floor(h/2);
    resetDrawing();
}

function initDatafields(){
    noise.seed(Math.random());
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    initParticles();
    initField();
    initCfield();
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
    ctx.fillStyle = convertHexToRGBA(bg, 0.001);
    drawBackground();
    drawParticles(noiseZ);
}

function wdraw() {
    requestAnimationFrame(draw);
    drawBackground();
    noiseZ += 0.002;
    for(let i = -8; i < 8; i++){
        drawSine(noiseZ, i);
    }
}

function cdraw() {
    requestAnimationFrame(draw);
    drawBackground();
    noiseZ += 0.002;
    drawCircles(noiseZ, 0);
}

function resetDrawing() {
    if(cases == 0){
        setup(40);
        clear();
        ctx.fillStyle = convertHexToRGBA(bg, 0.25);
    }
    if(cases == 1){
        //setup(13);
        clear();
        ctx.fillStyle = convertHexToRGBA(bg, 0.25);
    }
    if(cases == 2){
        clear();
        ctx.fillStyle = convertHexToRGBA(bg, 0.5);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
    }
}
function draw() {
    if(!timer){
        timer = Date.now();
    }
    if (Date.now() - timer > 4500 || cases == -1){
        timer = null;
        cases = (cases+1) % 3;
        resetDrawing();
    }
    switch (cases){
        case 0:
            fdraw();
            break;
        case 1:
            cdraw();
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
    if(!window.chrome){
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
    else{
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
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, size * length + 10);
            ctx.lineTo(-9, (size * length + 10)-9);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, size * length + 10);
            ctx.lineTo(9, (size * length + 10)-9);
            ctx.stroke();
            ctx.restore();
            }
        }
    }
}

function drawParticles(t) {
    let partID = 0;
    particles.forEach(p => {
        
    ctx.fillStyle = partID%3 ? stroke : bg;
    p.draw();
    let pos = p.pos.div(size);
    let v;
    if(pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
        let partRand = (noise.simplex3(0, t, partID)-0.5)*0.1;
        v = field[Math.floor(pos.x)][Math.floor(pos.y)];
        v.x += partRand;
        v.y += partRand;
    }
    p.move(v);
    p.wrap();
    partID++;
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
        y = Math.sin(x+10*noise.simplex3(0, offset_y/30, noiseZ))+offset_y/1.6;
        var dx = Math.abs(mouseX - unit*x)/10.0;
        var dy = Math.abs(mouseY - unit*y - yAxis)/10.0;
        ctx.lineTo(i, unit*y+yAxis+((dx+dy)*noise.simplex3(i, 0, noiseZ)*noise.simplex3(x/3, 10, noiseZ)));
    }
  ctx.stroke();  
}

function drawCircles(t, offset_y) {
    let fillstyle_BAK = ctx.fillStyle;
    ctx.fillStyle = stroke;
    const halfWidth = canvas.width / (2 * dpr);
    const halfHeight = canvas.height / (2 * dpr);
    for (let j = 0; j < crings; j++) {
      const polyCount = cpolys[j];
      const ringRadius = crad[j];
      const noisej = (noise.simplex3(j/10, 0, t)/2+0.5)*3;
      for (let i = 0; i < polyCount; i++) {
            let cursor_dist = dpr_mul*(mouseDistance(cfield[j][i].x*dpr_mul, cfield[j][i].y*dpr_mul)/600);
            let circ_pos = i + noisej;
            let x = Math.cos(circ_pos / polyCount * Math.PI*2);
            let y = Math.sin(circ_pos / polyCount * Math.PI*2);
            const offset = cursor_dist * noise.simplex3(x, y + (j * 0.03), t) * (ringRadius / 5);
            x = x * (ringRadius + offset) + halfWidth;
            y = y * (ringRadius + offset) + halfHeight;
            ctx.fillRect(x, y, 3, 3);
      }
    }
    ctx.fillStyle = fillstyle_BAK;
}

clear();
draw();