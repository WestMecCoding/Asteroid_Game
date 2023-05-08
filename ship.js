// ------------Refactor old code
// export function drawTriangle(canvas, ctx, size) {
//   const x = canvas.width / 2;
//   const y = canvas.height / 2 - size / 2;
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x - size / 2, y + size);
//   ctx.lineTo(x + size / 2, y + size);
//   ctx.closePath();
//   ctx.fillStyle = "#FFFFFF";
//   ctx.fill();
//   ctx.strokeStyle = "#FF0000"; // sets stroke color to white

//   ctx.stroke();
// }

class Ship {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.size = size;
    this.rotation = 0;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.lineTo(-this.size / 2, this.size / 2);
    ctx.lineTo(this.size / 2, this.size / 2);
    ctx.closePath();

    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    // Draw prominent nose with a different color
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2); // Nose
    ctx.lineTo(-this.size / 4, this.size / 4); // Left middle
    ctx.lineTo(this.size / 4, this.size / 4); // Right middle
    ctx.closePath();
    ctx.fillStyle = "#FF0000"; // Red color
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    ////////////////////
    // Bounce the ship when it hits the edge of the canvas
    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx = -this.vx * 0.9; // Reverse and reduce velocity on x-axis
      this.x = this.x < 0 ? 0 : this.canvas.width; // Clamp position within canvas
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy = -this.vy * 0.9; // Reverse and reduce velocity on y-axis
      this.y = this.y < 0 ? 0 : this.canvas.height; // Clamp position within canvas
    }
  }
}

export function createShip(canvas, size) {
  return new Ship(canvas, size);
}
