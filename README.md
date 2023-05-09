# ASTEROID GAME PROJECT

## step-14 branch

We will add a speed wheel like a joystick that will take a mouse click to change the direction and velocity of the ship.

## step-13 branch

We need to slow the ship down.

We need to fix some of the array issues that's making the asteroid array destroy too many asteroids when collided.

We need to change the texture of the asteroids to be more complex.

we will add a game over when we hit 3 asteroids plus a command to restart the game with the space bar.

## step-12 branch

We will add collision with the asteroids and take damage.

We will slow down the total acceleration of the ship.

We will make the asteroids more textured by combining line drawings.

## step-11 branch

We will make the ship jump position as it moves across the screen edges.

We will add a hud to keep track of destroyed and damaged scores.

- the hud will be created with a div.

## step-10 branch

We will make the asteroid "explode" when a bullet hits it and then randomly spawn around the screen.

Then we will add more asteroids later.

To add asteroids of various sizes that randomly float around the screen in your Asteroids JS canvas game, you could follow these steps:

1. Create an Asteroid class: Start by creating a new class for the asteroids that will be floating around the screen. This class should have properties such as size, position, velocity, and rotation, and methods for updating and drawing the asteroid.

2. Spawn asteroids randomly: In your AnimationLoop function, add logic to randomly spawn new asteroids at a random position on the canvas. You could use the Math.random() method to generate random numbers for the position, size, and velocity of the asteroids. To ensure that no more than 3 or 4 asteroids are on the screen at once, you could keep track of the number of active asteroids and limit the spawn rate accordingly.

3. Update asteroid positions: In your AnimationLoop function, update the positions of the asteroids based on their velocity and rotation. You could also add logic to detect collisions between the asteroids and other objects such as the ship or bullets.

4. Draw asteroids on the canvas: In your AnimationLoop function, draw the asteroids on the canvas using the appropriate size, position, and rotation. You could also add visual effects such as particle trails or explosions when the asteroids are destroyed.

5. Resize the canvas: Finally, add logic to your resize function to update the positions and sizes of the asteroids when the canvas is resized. This could involve recalculating the positions and sizes based on the new canvas dimensions and ensuring that the asteroids remain within the bounds of the canvas.

## step-9 branch

In this step we will slow down the ship with a clamp down mechanism using the pythagorean theorem.

We will add a random asteroid that floats around the screen without collision.

## step-8 branch

In this step we will fire bullets when pressing the space bar.

### QUESTIONS

1. Why does the browser stop when i press space bar? The browser must have prevent default. Also, the space bar has to be a different event handler than the switch case for the ship handling.
2. Why do the bullets fire so rapidly when we hold down the space bar. How do we prevent this behavior.

## We need to create an object that holds the keypresses.

We will extract some of the code from the index file into a main.js file that holds the event handlers.

## step-7 branch

In this branch we will add rocket booster images to the back of the ship.

We will also refactor some of the animation loop logic

### QUESTIONS

- why do we wrap functions in curly braces and not export class constants?
- What's the correct syntax for exporting classes? Do we need export default class or not?
- We will add some random asteroid type objects that float around the screen WITHOUT COLLISION.
- What does ctx.restore() do?

## step-6-c branch

Add in functionality to bounce the ship back from the walls.

Add a color change to the nose of the ship.

## step-6-b branch

The step-6 branch was broken. This will be a refactor branch.

1. Update the resizeCanvas function in index.html to set the new size of the ship and reposition it in the center of the canvas.
2. Move the animateLoop call outside of the resizeCanvas function in index.html.
3. Call the ship.update() method inside the loop function in stars.js.

## step-6 branch

In this branch we will add in an animationLoop.js file to hold our animation callbacks.

We will slow down the animation of the star blinking.

We will add some event handlers to make the ship float around the screen.

To move the ship around the screen using the arrow keys, you can follow these steps:

1. Add properties to the drawTriangle function for position, rotation, and velocity.
2. Update the drawTriangle function to use these properties when drawing the ship.
3. Create event handlers for the arrow keys to modify the ship's properties.
4. Update the animation loop to move the ship based on its velocity.

## step-5 branch

In this branch we will add some glittering stars to the background.

We need to add a stars.js file to add in the logic.

We will fill in the color of the ship.

We will use a callback function called drawShip as a parameter to pass functions into other scripts.

### Objectives

1. Create a function to generate a random number within a range.
2. Create a Star class with properties like x, y, radius, and color.
3. Initialize an array of Star objects with random properties.
4. Create an animation loop that updates the properties of each star and redraws them on the canvas.

## step-4 branch

We will also separate out the ship logic into a separate js file.

We will need to declare the script tags as modules for the import and export statements to work.

### QUESTIONS

- what happens in legacy code before ES6 when not declaring module type on the scripts?
- What happens when we change the order of the script tags? How does the flow of information change?
- What happens if we don't declare the parameters to be passed between the scripts?

## step-3 branch

In this step we will add a simple trangle to the canvas so we can see the resizing taking place.

We need to declare the size variable in the script function scope so that both the drawTriangle function and the resizeCanvas() function have access to it.

## step-2 branch

We have added a resizing function that will change the size of the canvas responsively.

## MAIN BRANCH

This is the beginning of the project. In this step we have setup some context for a canvas and made a resizable window.

The background color is plain black.
