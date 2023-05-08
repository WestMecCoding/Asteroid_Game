class Ship {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.size = size;
    this.rotation = 0;
    this.vx = 0;
    this.vy = 0;
    // add an acceleration factor
    this.accelerating = 0;
    this.speedLimit = 2;
  }

  draw(ctx) {
    // draw the ship
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

    // Draw rectangles for forward or backward motion
    if (this.vx !== 0 || this.vy !== 0) {
      ctx.fillStyle = "#FFA500"; // Orange color
      if (this.accelerating === 1) {
        // Forward motion
        ctx.fillRect(
          -this.size / 2,
          this.size / 2,
          this.size / 4,
          this.size / 2
        );
        ctx.fillRect(
          this.size / 4,
          this.size / 2,
          this.size / 4,
          this.size / 2
        );
      } else if (this.accelerating === -1) {
        // Backward motion
        ctx.fillRect(
          -this.size / 8,
          (-this.size * 3) / 4,
          this.size / 4,
          this.size / 2
        );
      }
    }
    // finalize
    ctx.restore();
  }

  update() {
    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    if (currentSpeed > this.speedLimit) {
      const ratio = this.speedLimit / currentSpeed;
    }
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
