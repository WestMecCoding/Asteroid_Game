import { createShip } from "./ship.js";
import { animateLoop } from "./animationLoop.js";
import { createBullet } from "./bullet.js";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let size;
const ship = createShip(canvas, Math.min(canvas.width, canvas.height) * 0.1);
const bullets = [];
// add a cooldown mechanism to slow down bullets
const bulletCooldown = 300;
let lastBulletTime = 0;

// add other attributes for the ship
const rotationSpeed = 0.05;
const acceleration = 0.1;

// add a keystates object to recognize independent key presses
const keyStates = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = Math.min(canvas.width, canvas.height) * 0.1;
  ship.size = size * 1;
  // add ship x and y to resize
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  // drawTriangle(canvas, ctx, size);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

document.addEventListener("keydown", (event) => {
  if (keyStates.hasOwnProperty(event.key)) {
    event.preventDefault();
    keyStates[event.key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (keyStates.hasOwnProperty(event.key)) {
    keyStates[event.key] = false;
  }
});

function fireBullet() {
  const bulletSpeed = 5;
  const bullet = createBullet(
    canvas,
    ship.x,
    ship.y,
    ship.rotation,
    bulletSpeed
  );
  bullets.push(bullet);
}
animateLoop(
  canvas,
  ctx,
  // () => drawTriangle(canvas, ctx, size))
  () => {
    if (keyStates["ArrowUp"]) {
      ship.vx += acceleration * Math.sin(ship.rotation);
      ship.vy -= acceleration * Math.cos(ship.rotation);
      // add in acceleration factor
      ship.accelerating = 1;
      // console.log("acceleration is 1");
    } else if (keyStates["ArrowDown"]) {
      ship.vx -= acceleration * Math.sin(ship.rotation);
      ship.vy += acceleration * Math.cos(ship.rotation);
      // add in acceleration factor
      ship.accelerating = -1;
      // console.log("acceleration is -1");
    } else {
      ship.accelerating = 0;
    }

    if (keyStates["ArrowLeft"]) {
      ship.rotation -= rotationSpeed;
    } else if (keyStates["ArrowRight"]) {
      ship.rotation += rotationSpeed;
    }
    // add the bullet firing mechanism
    const currentTime = performance.now();
    if (keyStates[" "] && currentTime - lastBulletTime > bulletCooldown) {
      fireBullet();
      lastBulletTime = currentTime;
    }
    ship.draw(ctx);
    ship.update();

    bullets.forEach((bullet) => {
      bullet.draw(ctx);
      bullet.update();
    });
  }
);
