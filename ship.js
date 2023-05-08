export function drawTriangle(canvas, ctx, size) {
  const x = canvas.width / 2;
  const y = canvas.height / 2 - size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size / 2, y + size);
  ctx.lineTo(x + size / 2, y + size);
  ctx.closePath();
  ctx.strokeStyle = "#FFFFFF"; // sets stroke color to white

  ctx.stroke();
}
