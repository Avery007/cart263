"use strict";

/********************************************************************

Project 2
Qingyi Deng



*********************************************************************/
let size = 10; // initial size of input text
let positionX = 500; // initial position of text
let positionY = 100;

let rotation = 0; // no rotation in the beginning

// the voice generated
let wordTrump = 'Trump is the lion king';
let wordWar = 'War is good,keep fighting boy';
let wordAI = 'AI is the god,you should worship him';

let saying = true; // used to check whether to generate voice repeatly

$(document).ready(setup);

// setup key control
function setup() {
  document.addEventListener('keydown', moveUp);
  document.addEventListener('keydown', moveDown);
  document.addEventListener('keydown', moveLeft);
  document.addEventListener('keydown', moveRight);
  document.addEventListener('keydown', restart);

}


// funcitons for key control
function moveUp(e) {
  if (e.keyCode === 87) {
    positionY = positionY - 10; // move up
    document.getElementById("text").style.top = `${positionY}px`;

  }

}
// funcitons for key control
function moveDown(e) {
  if (e.keyCode === 83) {
    positionY = positionY + 10; // move down
    document.getElementById("text").style.top = `${positionY}px`;

  }

}
// funcitons for key control
function moveLeft(e) {
  if (e.keyCode === 65) {
    positionX = positionX - 10; //move left
    document.getElementById("text").style.left = `${positionX}px`;

  }

}
// funcitons for key control
function moveRight(e) {
  if (e.keyCode === 68) {
    positionX = positionX + 10; //move right
    document.getElementById("text").style.left = `${positionX}px`;

  }


}

// function to restart
function restart(e) {
  if (e.keyCode === 13) { // enter key
    location.reload(); // refresh to restart
  }


}
// to satrt the game when button is clicked
function start() {
  $('#buttonEdit').css('display', 'block'); // display edit button
  $('#buttonStart').css('display', 'none'); // hide start botton
  $('#bc').hide(); // hide cover image

}

// enable edit
function startEdit() {
  $('#buttonEdit').hide(); //hide button
  $('.instruction').text("Choose a pattern!"); // display instruction
  // display three buttons as  different pattern
  $('#buttonWar').show();
  $('#buttonTech').show();
  $('#buttonPolitic').show();

}

//  pattern 1
function chosePolitic() {

  //display images and input button
  $('#trump').show();
  $('#globe').show();
  $('#buttonInput').show();
  // hide other choice of patterns
  $('#buttonWar').hide();
  $('#buttonTech').hide();
  $('#buttonPolitic').hide();

  // make images draggable and resizable
  $('#trump').draggable();
  $('#trump').resizable();
  $('#globe').draggable();
  $('#globe').resizable();

  // display instruction images and its control button
  $('#explain').show();
  $('#closeExplain').show();

  // display intruction tex
  $('.instruction').text("To end the voice and continue, correctly input the sentence you heard! Notice punctuations and capital letters");

  // allow players to rotate the images by clicking on them
  document.getElementById('trump').addEventListener('click', rotate);
  document.getElementById('globe').addEventListener('click', rotate);
  // generate voice related
  speak(wordTrump);

}

// voice generate fucntion
function speak(content) {

  if (saying == true) { // when true repeat it

    responsiveVoice.speak(content, 'UK English Male', {
      pitch: 0.6,
      rate: 0.6,
      volume: 10,
      onend: function() {
        speak(content);
      } // call to repeat
    });

  }

}

// chose pattern 2
function choseTech() {

  // hide other choices
  $('#buttonPolitic').hide();
  $('#buttonWar').hide();
  $('#buttonTech').hide();

  //display images and buttons
  $('#buttonInput').show();
  $('#lion').show();
  $('#explain').show();
  $('#closeExplain').show();
  // display text instruction
  $('.instruction').text("To end the voice and continue, correctly input the sentence you heard! Notice punctuations and capital letters");
  // make images draggable and resizable
  $('#lion').draggable();
  $('#lion').resizable();

  // call voice generate function
  speak(wordAI);

  // allow to rotate
  document.getElementById('lion').addEventListener('click', rotate);

}


// choise 3
function choseWar() {

  // display texts and buttons
  $('.instruction').text("To end the voice and continue, correctly input the sentence you heard! Notice punctuations and capital letters");
  $('#nuclear').show();
  $('#buttonInput').show();
  $('#explain').show();
  $('#closeExplain').show();

  //hide texts and buttons
  $('#buttonPolitic').hide();
  $('#buttonWar').hide();
  $('#buttonTech').hide();

  // make elements draggable and resizable
  $('#nuclear').draggable();
  $('#nuclear').resizable();

  // allow to rotate
  document.getElementById('nuclear').addEventListener('click', rotate);

  // call voice generate function
  speak(wordWar);

}


// rotate fucntion
function rotate(e) {

  rotation = rotation + 5;
  e.target.style.transform = `rotate(${rotation}deg)`;

}

// allow input text
function input() {

  //display input box and hide the input button
  $("#myInput").show();
  $("#buttonClose").show();
  $("#buttonInput").hide();

}

// check input and react
function generate() {

  var inputText = $("#myInput").val();
  $('#text').text(inputText); //display input

  //compare input with correct answer which the voice says
  var result = inputText.localeCompare(wordAI);
  var result1 = inputText.localeCompare(wordTrump);
  var result2 = inputText.localeCompare(wordWar);
  if (result == 0 || result1 == 0 || result2 == 0) { // 0 represent equal
    saying = false; // change tracking value so it no long repeats

    // display texts and new buttons
    alert('Congradulation! You got it');
    $('.instruction').text("Press ASDW to move the text")
    $(buttonSmaller).show();
    $(buttonBigger).show();
    $(buttonColor).show();
    $(intheEnd).show();
    // hide input box and button
    $("#buttonClose").hide();
    $("#myInput").hide();
  }
  // if it is not correct, ask the player to do it again
  else {
    alert('oops! You failed to type the correct answer, try it again');
  }
}


// change text color randomly
function colorChange() {

  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  //Change the background color of the element to random color
  document.getElementById("text").style.color = `rgb(${r}, ${g}, ${b})`;

}

//change text size
function sizeBigger() {

  size = size + 5; // make it bigger
  document.getElementById("text").style.fontSize = `${size}px`;

}

//make text smaller
function sizeSmaller() {

  if (size > 5) {
    size = size - 5;
    document.getElementById("text").style.fontSize = `${size}px`;
  }

}

// hide the crocodile image instruciton when button is clicked
function closeExplain() {

  $('#explain').hide();
  $('#closeExplain').hide();
}

// when players finish
function finished() {
  $('.buttonClass').hide(); // hide all the button
  $('.instruction').text("Press ENTER to restart"); // change instruciton
  // generate a new voice
  responsiveVoice.speak("Congratulations good kid,you have made it. You must enjoy your new memory", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });

}
