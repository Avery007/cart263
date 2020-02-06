"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let $sisyphus=$("#sisyphus");
let $static=$("#static");
let found=false;

var randomX = Math.floor( Math.random() * 1000 );
var randomY = Math.floor( Math.random() * 500 );
 $(document).ready(setup);

function setup(){
  instruction();
setTimeout(shift,1000);
document.addEventListener('keydown', movement);
document.addEventListener('keyup', noMove);

$('#suicide').on('click',restart);
$('#suicide').css('cursor', 'crosshair');

}
function restart(){
setTimeout(function(){location.reload()},5000);
 $('#text').text('You will restart in 5 seconds!');
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
  if(found==false){
  var randomX = Math.floor( Math.random() * 1000 );
  var randomY = Math.floor( Math.random() * 500 );
  $('#bulb').animate({
      left: randomX,
      top:randomY,



    });
setTimeout(tip,1000);

}
}

function shift(){

//  $static.css('width','+=500');
$('#bulb').on('mouseover', showMind);

$('#bulb').on('mouseover', dialog );
// dialog();
}

function dialog(){

  $("#dialog").dialog({
  dialogClass: "no-close",
    height: 200,
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
  top: 250,
  left:100,
});
}

function instruction(){

  $("#instruction").dialog({
  dialogClass: "no-close",
    height: 300,
    width:350,
    title:'Rules',
  buttons: [
    {
      text: "OK",


      click: function() {
        $( this ).dialog( "close" );
        setTimeout(tip,2000);
      }
    }
  ]
});

$('#instruction').parent().offset({
  top: 50,
  left:400,
});
}

function showMind(){
  found=true;
   $('#bulb').css('display','none');
   $('#mind').css('display','block');
   $('#tool').css('display','block');
 dragTool();

 $('#mind').droppable({
    // The drop option specifies a function to call when a drop is completed
    drop: dropEffect
  });
}
function dropEffect(event,ui){
ui.draggable.remove();
$(this).attr('src', 'assets/images/brainfree.png');
$('#sisyphus').attr('src', 'assets/images/end.gif');
$('#static').css('display','none');
$('#suicide').hide();
$('#text').hide();
$("#finalMessage").show();
setTimeout(animate,1000);
}
function dragTool(){
$( "#tool" ).draggable();
$('#tool').css('cursor', 'move');
}
function animate(){

$("#finalMessage").animate({left: '100px'},'slow');
$("#finalMessage").animate({fontSize: '2em'}, "slow");
}
