"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let size = 10;
let positionX = 500;
let positionY = 100;
let imgWidth = 200;
let drag = true;
let rotation = 0;
let opacity=10;
let wordTrump='Trump is the lion king';
let wordWar='War is good,keep fighting boy';
let wordAI='AI is the god,you should worship him';
let voiceParameters = {
  pitch: 0.6,
  rate: 0.6,
  volume: 10,
  onend:speak
}

let saying=true;
$(document).ready(setup);




function chosePolitic() {
  $('#trump').show();
  $('#globe').show();

  $('#trump').draggable();
    $('#trump').resizable();
    $('#globe').draggable();
$('#globe').resizable();

document.getElementById('trump').addEventListener('click', rotate);
document.getElementById('globe').addEventListener('click', rotate);
speak(wordTrump);


}

function speak(content){

  if(saying==true){

responsiveVoice.speak(content,'UK English Male',
{
  pitch: 0.6,
  rate: 0.6,
  volume: 10,
  onend:function(){speak(content);}
}

);
console.log(saying);

}

}
function start(){
$('#buttonEdit').css('display','block');
$('#buttonStart').css('display','none');
$('#bc').hide();
//$('#content').show();
}

function startEdit(){
  $('#buttonEdit').hide();
  $('#buttonSize').show();
  $('#buttonWar').show();
  $('#buttonTech').show();
  $('#buttonColor').show();
  $('#buttonPolitic').show();
  $('#buttonInput').show();

}
function choseTech() {

  $('#lion').show();

  $('#lion').draggable();
$('#lion').resizable();

speak(wordAI);
document.getElementById('lion').addEventListener('click', rotate);
//  $('#globe').draggable();


}

function choseWar() {
  $('#nuclear').show();

  $('#nuclear').draggable();
$('#nuclear').resizable();
;
document.getElementById('nuclear').addEventListener('click', rotate);

speak(wordWar);


}

function rotate(e) {

  rotation = rotation + 5;
  e.target.style.transform = `rotate(${rotation}deg)`;

}
//function opacityChange() {

  //opacity = opacity-1;

//document.getElementById("trump").style.opacity= `${opacity}`;

//}
function setup() {
  document.addEventListener('keydown', moveUp);
  document.addEventListener('keydown', moveDown);
  document.addEventListener('keydown', moveLeft);
  document.addEventListener('keydown', moveRight);


}

function moveUp(e) {
  if (e.keyCode === 87) {
    positionY = positionY - 10;
    document.getElementById("text").style.top = `${positionY}px`;

  }

}

function moveDown(e) {
  if (e.keyCode === 83) {
    positionY = positionY + 10;
    document.getElementById("text").style.top = `${positionY}px`;

  }

}

function moveLeft(e) {
  if (e.keyCode === 65) {
    positionX = positionX - 10;
    document.getElementById("text").style.left = `${positionX}px`;

  }

}

function moveRight(e) {
  if (e.keyCode === 68) {
    positionX = positionX + 10;
    document.getElementById("text").style.left = `${positionX}px`;

  }


}

function input() {
  $("#myInput").show();
  $("#buttonClose").show();

}

function generate() {
  $("#buttonClose").hide();
  var str = $("#myInput").val();
  $('#text').text(str);
  if(str==wordTrump||str==wordWar||wordAI){
    saying=false;
  }
}

function colorChange() {

  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  //Change the background color of the element to random color
  document.getElementById("text").style.color = `rgb(${r}, ${g}, ${b})`;

}


function sizeChange() {


  size = size + 5;
  document.getElementById("text").style.fontSize = `${size}px`;
  console.log(size);
  //Change the background color of the element to random color
  //theSize.style.fontSize='25px';

}
