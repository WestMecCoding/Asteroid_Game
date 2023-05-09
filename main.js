import { createShip } from "./ship.js";
import { animateLoop } from "./animationLoop.js";
import { createBullet } from "./bullet.js";
import { createAsteroid } from "./asteroid.js";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let size;
const ship = createShip(canvas, Math.min(canvas.width, canvas.height) * 0.1);
const asteroids = [];
let isPaused = false;

for (let i = 0; i < 3; i++) {
  const asteroid = createAsteroid(
    canvas,
    Math.min(canvas.width, canvas.height) * 0.1
  );
  asteroids.push(asteroid);
}

const bullets = [];
// declare an asteroid array
let destroyed = 0;
let collisions = 0;
// add a cooldown mechanism to slow down bullets
const bulletCooldown = 300;
let lastBulletTime = 0;

// add other attributes for the ship
const maxAcceleration = 1;
const rotationSpeed = 0.05;

const acceleration = 0.05;

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
  asteroids.forEach((asteroid) => {
    asteroid.size = size * 1.5;
  });
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
  // for (const asteroid of asteroids) {
  //   if (ship.collidesWith(asteroid)) {

  //     // ship.takeDamage(asteroid.size);
  //   }
  // }
}
// document.addEventListener("keydown", function (event) {
//   if (event.code === "space" && isPaused) {
//     console.log("space key pressed");
//     location.reload();
//   }
// });

document.addEventListener("keydown", (event) => {
  if (keyStates.hasOwnProperty(event.key)) {
    event.preventDefault();
    keyStates[event.key] = true;
  }
});
animateLoop(
  canvas,
  ctx,
  // () => drawTriangle(canvas, ctx, size))
  () => {
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
  }
);
