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
let fruit = [
  "apple",
  "pear",
  "banana",
  "strawberry",
  "watermelon",
  "kiwi",

]

$(document).ready(setup);


function setup() {
  responsiveVoice.speak("Welcome to the year 2030", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });


enterScreen('#screen2',$("#buttonShop"));
enterScreen('#screen3',$("#buttonShop"));
//enterScreen($('#screen3'),voice3);

}

function enterScreen(screen,button){
$(screen).mouseover(
  function() {$(screen).css('width','40vw');
              $(screen).css('height','40vh');
             $(screen).css('zIndex','3');
             $('#backColor').show();
             button.show();
             button.position({
                           my: "center",
                           at: "center",
                           of: screen
                           });


});




  $(screen).click(function () {
              $('#backColor').hide();
              $(screen).css('width','10vw');
            $(screen).css('height','10vh');
              $(screen).css('zIndex','1');
             button.hide();
});



}
//function deliver(){
  //$("#screen1").position({
                //my: "center",
                //at: "center",
                //of: "#screen4"
             //});


//}


  function showFruit() {
    responsiveVoice.speak("Welcome you got it", 'UK English Male', {
      pitch: 0.6,
      rate: 0.6,
      volume: 10,

    });

}

function stuff(){
  console.log(inputText);
var inputText = $("#myInput").val();
var inputNumber = $("#number").val();
$('#explain').text(inputNumber); //display input

}

function shopping(){
  $('#shopping').show();
  $('#myInput').show();
  $('#myNumber').show();
  $('#buyStuff').show();
  $('#bigscreen').show();
  $('#screen2').hide();
  $('#buttonShop').hide();

}
