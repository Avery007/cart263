"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let size=10;
$(document).ready(setup);



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
