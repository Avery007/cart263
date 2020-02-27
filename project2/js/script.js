"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let size=10;
let positionX=500;
let positionY=100;

$(document).ready(setup);

function chosing(){
$('.politicImg').show();
$('#trump').draggable();
$('#globe').draggable();

}
function setup(){
  document.addEventListener('keydown', moveUp);
  document.addEventListener('keydown', moveDown);
  document.addEventListener('keydown', moveLeft);
  document.addEventListener('keydown', moveRight);


}

function moveUp(e){
  if(e.keyCode===87)
  {  positionY=positionY-10;
document.getElementById("text").style.top = `${positionY}px`;

}

}
function moveDown(e){
  if(e.keyCode===83)
  {  positionY=positionY+10;
document.getElementById("text").style.top = `${positionY}px`;

}

}

function moveLeft(e){
  if(e.keyCode===65)
  {  positionX=positionX-10;
document.getElementById("text").style.left= `${positionX}px`;

}

}
function moveRight(e){
  if(e.keyCode===68)
  {  positionX=positionX+10;
document.getElementById("text").style.left= `${positionX}px`;

}


}

function input() {
   $("#myInput").show();
  $("#buttonClose").show();

}

function generate(){
  $("#buttonClose").hide();
  var str = $("#myInput").val();
  $('#text').text(str);

}
function colorChange(){

 let r=Math.floor(Math.random()*255);
 let g=Math.floor(Math.random()*255);
 let b=Math.floor(Math.random()*255);
 //Change the background color of the element to random color
  document.getElementById("text").style.color = `rgb(${r}, ${g}, ${b})`;

}


function sizeChange(){


 size = size+5;
document.getElementById("text").style.fontSize = `${size}px`;
console.log(size);
 //Change the background color of the element to random color
//theSize.style.fontSize='25px';

}
