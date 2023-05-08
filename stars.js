// Helper function to generate a random number within a range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Star {
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

// function name changed from animateStars to animateLoop
export function animateLoop(canvas, ctx, drawShip) {
  const stars = [];

  // Create an array of 100 Star objects with random properties
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(canvas));
  }

  // add in frame counter to change star blink speed
  let frameCounter = 0;
  const updateFrequency = 10; // Update stars every 10 frames

  // Animation loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      star.draw(ctx);

      if (frameCounter % updateFrequency === 0) {
        star.radius = randomInRange(1, 3); // Change star size
        star.color = `rgba(255, 255, 255, ${randomInRange(0.1, 1)})`; // Change star color
      }
    }
    frameCounter++;
    drawShip();
    requestAnimationFrame(loop);
  }

  loop();
}
