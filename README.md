# ASTEROID GAME PROJECT

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
