# ASTEROID GAME PROJECT

## step-8 branch

In this step we will fire bullets when pressing the space bar.

### QUESTIONS

1. Why does the browser stop when i press space bar? The browser must have prevent default. Also, the space bar has to be a different event handler than the switch case for the ship handling.
2. Why do the bullets fire so rapidly when we hold down the space bar. How do we prevent this behavior.

### PERFORMANCE.NOW()

performance.now() is a JavaScript function that returns a high-resolution timestamp in milliseconds, measured since the time origin, which is the start of the page's lifetime. This timestamp is more accurate and precise than using Date.now(), which provides the number of milliseconds since the Unix epoch (January 1, 1970).

performance.now() is particularly useful for measuring the duration of an operation or for synchronizing animations and other time-based functions. It's part of the High Resolution Time API, which is designed to provide more accurate and consistent timing information for web applications, especially when it comes to animations, audio, and other time-sensitive tasks.

Here's a simple example of using performance.now() to measure the duration of a function:

```js
const start = performance.now();

// Some operation or function call
someFunction();

const end = performance.now();
const duration = end - start;
console.log(`Function execution took ${duration} milliseconds`);
```

By using performance.now(), you can ensure that you get an accurate measurement of time elapsed, even if the system clock is adjusted or if the browser's internal clock has some inconsistencies.

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
