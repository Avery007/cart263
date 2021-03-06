"use strict";

/********************************************************************

Project 1
Qingyi Deng


*********************************************************************/
// audio source: http://fesliyanstudios.com/
const bgMusic = new Audio("assets/sounds/trouble.wav");
const breath = new Audio("assets/sounds/breath.wav");
const gameOverSound = new Audio("assets/sounds/over.wav");
const success = new Audio("assets/sounds/success.wav");

let found = false; // check if player moves the mouse on bulb image


$(document).ready(setup);

function setup() {
  instruction(); // display instruction
  document.addEventListener('keydown', movement); // set key control for the gif
  document.addEventListener('keyup', noMove); // set key control for the gif
  $('#suicide').css('cursor', 'crosshair'); // change mouse display

}

//key event:make the firgure move
function movement(e) {
  if (e.keyCode === 65) {
    $("#static").css('display', 'none'); //display gif
     breath.play();
  }
}
//key event: stop moving
function noMove() {
  $("#static").css('display', 'block'); // replace gif by static image
breath.pause();
}


// randomly move the bulb
function tipMove() {
  if (found == false) { // no long display when player finds it
    var randomX = Math.floor(Math.random() * 1000);
    var randomY = Math.floor(Math.random() * 500);
    $('#bulb').animate({
      left: randomX,
      top: randomY,
    });

    setTimeout(tipMove, 1000); // repeatly move

  }
}


// allow new displays for player to end the trip,
//this will be generated when player put mouse over the bulb image
function shift() {

  $('#bulb').on('mouseover', showMind);
  $('#bulb').on('mouseover', dialog);
  tipMove(); // trigger movement
}


// a dialop to show info
function dialog() {

  $("#dialog").dialog({
    dialogClass: "no-close",
    height: 200,
    buttons: [{
      text: "OK",
      icon: "ui-icon-heart",

      click: function() {
        $(this).dialog("close");
      }
    }]
  });

  $('#dialog').parent().offset({
    top: 250,
    left: 100,
  });
}


// instruction when game starts
function instruction() {

  $("#instruction").dialog({
    dialogClass: "no-close",
    height: 300,
    width: 350,
    title: 'Rules',
    buttons: [{
      text: "OK",
      click: function() {
        $(this).dialog("close");
        setTimeout(shift, 1000);
        bgMusic.loop=true;
        bgMusic.volume = 0.6;
        bgMusic.play();
      }
    }]
  });

  $('#instruction').parent().offset({
    top: 50,
    left: 400,
  });
}

// another event generated by the bulb
function showMind() {
  found = true; // so the bulb will disapear
  $('#bulb').css('display', 'none');
  // display the new stuff
  $('#mind').css('display', 'block');
  $('#tool').css('display', 'block'); // a draggable tool
  dragTool();

  $('#mind').droppable({
    // The drop option specifies a function to call when a drop is completed
    drop: dropEffect
  });
}

// events occur after drop
function dropEffect(event, ui) {
  ui.draggable.remove();
  $(this).attr('src', 'assets/images/brainfree.png'); // change the brain image <!--source:clearpng.com-->
  $('#sisyphus').attr('src', 'assets/images/end.gif'); //change the gif <!--source:gifhy.com-->
  $('#static').remove(); // remove the static image
  $('#suicide').hide();
  $('#text').hide();
  $('.button').remove();
  $("#finalMessage").show(); // display the text
  setTimeout(animate, 1000); // effect of the text
  success.loop=true;
  success.play();
  bgMusic.pause();
}

// make the tool draggable
function dragTool() {
  $("#tool").draggable();
  $('#tool').css('cursor', 'move'); // change mouse display
}

// move the text and resize it
function animate() {

  $("#finalMessage").animate({
    left: '100px'
  }, 'slow');
  $("#finalMessage").animate({
    fontSize: '2em'
  }, "slow");
}

// display a text and refresh the page when play clicks suicide
function gameOver() {
  gameOverSound.play();
  $('#gameOver').show(); // display text
  $('#bulb').hide();
  setTimeout(function() {
    location.reload() // refresh to restart
  }, 6600);
}
