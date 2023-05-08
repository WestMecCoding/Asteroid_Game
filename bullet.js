class Bullet {
  constructor(canvas, x, y, rotation, speed) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.size = 5;
    // this.speed = speed;
    this.speed = 5;
    this.vx = this.speed * Math.sin(this.rotation);
    this.vy = -this.speed * Math.cos(this.rotation);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  collidesWith(asteroid) {
    const distance = Math.sqrt(
      (this.x - asteroid.x) ** 2 + (this.y - asteroid.y) ** 2
    );
    return distance < this.size / 2 + asteroid.size / 2;
  }
}

export function createBullet(canvas, x, y, rotation, speed) {
  return new Bullet(canvas, x, y, rotation, speed);
}
