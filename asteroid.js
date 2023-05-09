class Asteroid {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.size = size;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.rotation = Math.random() * Math.PI * 2;
    this.velocity = {
      x: Math.random() * 2 - 1, // Random x velocity between -1 and 1
      y: Math.random() * 2 - 1, // Random y velocity between -1 and 1
    };
  }

  draw(ctx) {
    // Draw the asteroid as a simple circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#22aacc";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
  }

  update() {
    // Update the asteroid position based on its velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce the asteroid when it hits the edge of the canvas
    if (this.x < 0 || this.x > this.canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

export function createAsteroid(canvas, size) {
  return new Asteroid(canvas, size);
}
