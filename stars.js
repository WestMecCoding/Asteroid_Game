// Helper function to generate a random number within a range
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = randomInRange(0, canvas.width);
    this.y = randomInRange(0, canvas.height);
    this.radius = randomInRange(1, 3);
    this.color = `rgba(255, 255, 255, ${randomInRange(0.1, 1)})`;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
