"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let $sisyphus=$("#sisyphus");
let $static=$("#static");

var randomX = Math.floor( Math.random() * 1000 );
var randomY = Math.floor( Math.random() * 500 );
 $(document).ready(setup);

function setup(){
setTimeout(shift,1000);
document.addEventListener('keydown', movement);
document.addEventListener('keyup', noMove);
setTimeout(tip,2000);
}

function movement(e){
if(e.keyCode===39){
 $("#static").css('display','none');


}
}

function noMove(){
$("#static").css('display','block');


}

function tip(){
  var randomX = Math.floor( Math.random() * 1000 );
  var randomY = Math.floor( Math.random() * 500 );
  $('#text').animate({
      left: randomX,
      top:randomY,



    });
setTimeout(tip,5000);
  console.log(randomX);
}

function shift(){

//  $static.css('width','+=500');
$('#text').on('mouseover', showMind);
$('#text').on('mouseover', dialog );
// dialog();
}
function dialog(){

  $("#dialog").dialog({
  dialogClass: "no-close",
    height: 400,
  buttons: [
    {
      text: "OK",
      icon: "ui-icon-heart",

      click: function() {
        $( this ).dialog( "close" );
      }
    }
  ]
});

$('#dialog').parent().offset({
  top: 200,
  left:100,
});
}
function showMind(){
   $('#mind').css('display','none');

}
function changeColor(){
$(this).css('color','red');
}
