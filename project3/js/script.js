"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let voice1="sellphone is the best entertainment";
let voice2="sellphone is the best beauty";
let voice3="we cannot live without sellphone";
$(document).ready(setup);


function setup() {
  responsiveVoice.speak("Welcome to the year 2030", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });


enterScreen($('#screen2'),voice2);
enterScreen($('#screen3'),voice3);
enterScreen($('#screen4'),voice4);
}

function enterScreen(screen,voice){
screen.mouseover(
  function() {screen.css('width','95vw');
              screen.css('height','90vh');
            screen.css('zIndex','2');
             responsiveVoice.speak(voice, 'UK English Male', {
                pitch: 5,
                rate: 1,
                volume: 10,

              });


});

screen.mouseleave(
  function() {screen.css('width','10vw');
              screen.css('height','10vh');
              screen.css('zIndex','1');



});


}
