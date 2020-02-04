"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let $sisyphus=$("#sisyphus");
let $static=$("#static");

 $(document).ready(setup);

function setup(){
setTimeout(shift,1000);
document.addEventListener('keydown', movement);
document.addEventListener('keyup', noMove);
}

function movement(e){
if(e.keyCode===39){
 $("#static").css('display','none');


}
}

function noMove(){
$("#static").css('display','block');


}



function shift(){

//  $static.css('width','+=500');
$('#text').on('mouseover', dialog );
//$('#text').on('mouseover', dialog );
 //dialog();
}
function dialog(){

  $("#dialog").dialog({
  dialogClass: "no-close",
//  position: { my:200, at: 300, };

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
}

function changeColor(){
$(this).css('color','red');
}
