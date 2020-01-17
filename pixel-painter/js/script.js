"use strict";

/********************************************************************

Pixel painter
Qingyi Deng

A small DOM-based program for "painting" on div-based pixels.

*********************************************************************/

// Constants
const NUM_PIXELS = 1000;
const PIXEL_REVERT_DELAY = 1000;
const DEFAULT_COLOR = 'black';
//let PAINT_COLOR = 'blue';
let rotation=0;
// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < NUM_PIXELS; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    // Add a mouseover handler to the new element
    // must click to draw, so easier control
    pixel.addEventListener('mouseover'&&'click', paint);
  //  pixel.addEventListener('mouseover'&&'keydown', remove);
    document.body.appendChild(pixel);

  }
// Add keycontrol to rotate the el'keydown
  document.addEventListener('keydown', rotate);

}

// function to rotate the pixels
function rotate(e){

  if(e.keyCode===39)
  {  rotation=rotation+1;
    let wholePixels = document.getElementsByClassName('pixel');// get the entire class
    for (let i = 0; i < wholePixels.length; i++) {
  wholePixels[i].style.transform = `rotate(${rotation}deg)`;

}

  }
}

// tried to add a remove funciton that when mouseover and key is pressed, it will remove the target pixel
function remove(e){
  if(e.keyCode===65)
  {let pixel = e.target;
  pixel.style.opacity = 0;
    //e.target.style.backgroundColor=`rgb(${0}, ${0}, ${0})`;

      //setTimeout(resetPixel, PIXEL_REVERT_DELAY, pixel);
  }


}
// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target contains the specific element moused over so let's
  // save that into a variable for clarity.
  let pixel = e.target;
  let r=Math.floor(Math.random()*255);
  let g=Math.floor(Math.random()*255);
  let b=Math.floor(Math.random()*255);
  // Change the background color of the element to random color
  pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  // Set a timeout to call the reset function after a delay
  // When we pass additional parameters (like 'pixel' below) they
  // are passed to the callback function (resetPixel)

}

// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = DEFAULT_COLOR;
}
