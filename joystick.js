class Joystick {
  constructor(x, y, outerRadius, innerRadius) {
    this.x = x;
    this.y = y;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.isMouseDown = false;
    this.innerCircleX = this.x;
    this.innerCircleY = this.y;
    this.angle = 0;
    this.distance = 0;
    // this.dragging = false;
  }
  handleMouseDown(event) {
    // if (!this.isMouseDown) return;
    const dx = event.clientX - this.x;
    const dy = event.clientY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.innerRadius) {
      this.isMouseDown = true;
    }
  }

  handleMouseMove(event) {
    if (!this.isMouseDown) return;

    const dx = event.clientX - this.x;
    const dy = event.clientY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // clamp the inner circle inside the outer circle
    const clampedDistance = Math.min(
      distance,
      this.outerRadius - this.innerRadius
    );
    this.innerCircleX = this.x + Math.cos(angle) * clampedDistance;
    this.innerCircleY = this.y + Math.sin(angle) * clampedDistance;
    // this.x += Math.cos(angle) * (clampedDistance - distance);
    // this.y += Math.sin(angle) * (clampedDistance - distance);

    this.angle = angle;
    this.distance = clampedDistance;
  }

  handleMouseUp() {
    // if (this.dragging) {
    this.isMouseDown = false;
    this.innerCircleX = this.x;
    this.innerCircleY = this.y;
    this.distance = 0;
    // this.dragging = false;
    // }
    // this.x = 100;
    // this.y = 100;
  }
  draw(ctx) {
    // Draw Outer Circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.outerRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw Inner Circle
    ctx.beginPath();
    ctx.arc(
      this.innerCircleX,
      this.innerCircleY,
      this.innerRadius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

export default Joystick;
