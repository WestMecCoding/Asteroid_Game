// IMPORTS
import { createShip } from "./ship.js";
import { createBullet } from "./bullet.js";
import { createAsteroid } from "./asteroid.js";
import Joystick from "./joystick.js";
import Star, { randomInRange } from "./stars.js";

// Canvas and Context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// CONSTANTS
////bullets
const bulletCooldown = 300; // the variable for the bullet cool down mechanism
//// ship
const maxAcceleration = 1;
const rotationSpeed = 0.05;
const acceleration = 0.05;
//// stars
const updateFrequency = 10; // Update stars every 10 frames

// Game Objects and Variables
let size;
let isPaused = false;
const ship = createShip(canvas, Math.min(canvas.width, canvas.height) * 0.1);
const asteroids = [];
const stars = [];
const bullets = [];
let destroyed = 0;
let collisions = 0;
let lastBulletTime = 0;
// add in frame counter to change star blink speed
let frameCounter = 0;

// Create first 3 asteroids
for (let i = 0; i < 3; i++) {
  const asteroid = createAsteroid(
    canvas,
    Math.min(canvas.width, canvas.height) * 0.1
  );
  asteroids.push(asteroid);
}
// instantiate the joystick
const joystick = new Joystick(
  canvas.width * 0.75,
  canvas.height * 0.75,
  50,
  15
);

// KEYSTATES OBJECT
// add a keystates object to recognize independent key presses
const keyStates = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,
};

// EVENT LISTENERS for KEY PRESSES
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

// add event listeners for canvas mouse events
canvas.addEventListener("mousedown", (event) => {
  joystick.handleMouseDown(event);
});
canvas.addEventListener("mousemove", (event) => {
  joystick.handleMouseMove(event);
});
canvas.addEventListener("mouseup", () => {
  joystick.handleMouseUp();
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

/////////////add collision
function checkCollision() {
  const collidedAsteroid = asteroids.find((asteroid) => {
    return ship.collidesWith(asteroid);
  });
  if (collidedAsteroid) {
    console.log("collision");
    const index = asteroids.findIndex((asteroid) => {
      return asteroid.id === collidedAsteroid.id;
    });
    asteroids.splice(index, 1);
    destroyed++;
    collisions++;
    if (collisions > 2) {
      console.log("stop");
      isPaused = true;
      // return isPaused;
      console.log(isPaused);
    }
    if (asteroids.length < 4) {
      const newAsteroid = createAsteroid(
        canvas,
        Math.min(canvas.width, canvas.height) * 0.1
      );
      asteroids.push(newAsteroid);
    }
  }
}

// RESIZE THE CANVAS DYNAMICALLY
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = Math.min(canvas.width, canvas.height) * 0.1;
  ship.size = size * 1;
  // add ship x and y to resize
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  asteroids.forEach((asteroid) => {
    asteroid.size = size * 1.5;
  });

  // update the joystick position
  joystick.x = canvas.width * 0.75;
  joystick.y = canvas.height * 0.75;
  stars.splice(0, stars.length);
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(canvas));
  }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create an array of 100 Star objects with random properties
//// This needs to come after the canvas has been resized

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.draw(ctx);

    if (frameCounter % updateFrequency === 0) {
      star.radius = randomInRange(1, 3); // Change star size
      star.color = `rgba(255, 255, 255, ${randomInRange(0.1, 1)})`; // Change star color
    }
  }
  frameCounter++;
  if (keyStates["ArrowUp"] && ship.accelerating < maxAcceleration) {
    ship.vx += acceleration * Math.sin(ship.rotation);
    ship.vy -= acceleration * Math.cos(ship.rotation);
    // add in acceleration factor
    // ship.accelerating = 0.05;
    ship.accelerating = 1;
    // console.log("acceleration is 1");
  } else if (keyStates["ArrowDown"] && ship.accelerating > -maxAcceleration) {
    ship.vx -= acceleration * Math.sin(ship.rotation);
    ship.vy += acceleration * Math.cos(ship.rotation);
    // add in acceleration factor
    // ship.accelerating -= 0.05;
    ship.accelerating = 1;
    // console.log("acceleration is -1");
  } else {
    if (ship.accelerating !== 0) {
      // ship.accelerating -= Math.sign(ship.accelerating) * 0.05;
      ship.accelerating = 0;
    }
    // ship.accelerating = 0;
  }

  if (keyStates["ArrowLeft"]) {
    ship.rotation -= rotationSpeed;
  } else if (keyStates["ArrowRight"]) {
    ship.rotation += rotationSpeed;
  }
  // add the bullet firing mechanism
  const currentTime = performance.now();
  if (
    keyStates[" "] &&
    currentTime - lastBulletTime > bulletCooldown &&
    !isPaused
  ) {
    fireBullet();
    lastBulletTime = currentTime;
  } else if (keyStates[" "] && isPaused) {
    location.reload();
  }
  if (!isPaused) {
    joystick.draw(ctx);
    ship.draw(ctx);
    ship.update();

    bullets.forEach((bullet) => {
      bullet.draw(ctx);
      bullet.update();
      asteroids.forEach((asteroid) => {
        if (bullet.collidesWith(asteroid)) {
          asteroids.splice(asteroids.indexOf(asteroid), 1);
          bullets.splice(bullets.indexOf(bullet), 1);
          destroyed++;
          console.log("destroyed: " + destroyed);
          if (asteroids.length < 4) {
            const newAsteroid = createAsteroid(
              canvas,
              Math.min(canvas.width, canvas.height) * 0.1
            );
            asteroids.push(newAsteroid);
          }
        }
      });
    });

    asteroids.forEach((asteroid) => {
      asteroid.update();
      asteroid.draw(ctx);
    });
    checkCollision();
    document.getElementById(
      "hud"
    ).innerHTML = `Asteroids Destroyed: ${destroyed}  Collisions: ${collisions}`;
  } else {
    document.getElementById("hud").innerHTML = "<div>Press Space</div>";
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
