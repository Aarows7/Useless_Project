const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = innerWidth, h = innerHeight;


window.addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});


class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 5; 
        this.color = `rgba(255, 255, 255, 1)`; 
        this.alpha = 1;
        this.fadeRate = Math.random() * 0.02 + 0.005; 
    }

    update() {
        this.alpha -= this.fadeRate;
        if (this.alpha < 0) this.alpha = 0;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); 
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1; 
    }
}

const particles = [];


addEventListener("pointermove", (e) => {
    particles.push(new Circle(e.clientX, e.clientY));
});


function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) {
            particles.splice(index, 1); 
        }
    });
    requestAnimationFrame(animate);
}


canvas.width = w;
canvas.height = h;
animate();