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

let canvas;
let ctx;
let field;
let w, h;
let size;
let columns;
let rows;
let noiseZ;
let particles;

function setup() {
    size = 12;
    noiseZ = 0;
    noise.seed(Math.random());  
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    reset();
    window.addEventListener("resize", reset);  
}

function reset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    drawBackground(1);
    initParticles();
}

function initParticles() {
    particles = [];
    let numberOfParticles = w * h / 1000;
    for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
    }
}

function draw() {
    requestAnimationFrame(draw);
    calculateField();
    noiseZ += 0.002;
    drawBackground(0.0001);
    drawParticles();
}

function calculateField() {
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
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha || 0.07})`;
    ctx.fillRect(0, 0, w, h);
}

function drawParticles() {
    let hue = Math.sin(noiseZ) * 30;
    ctx.fillStyle = "white";
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

setup();
draw();