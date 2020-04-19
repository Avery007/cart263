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
let inputText="";

$(document).ready(setup);


function setup() {
  responsiveVoice.speak("Welcome to the year 2030", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });


enterScreen('#screen2',$("#buttonShop"));
enterScreen('#screen3',$("#buttonHome"));
enterScreen('#screen4',$("#buttonHospital"));
//enterScreen($('#screen3'),voice3);


}



function gotData(data){

    let symptoms = getRandomElement(data.symptoms);
    let disorders = getRandomElement(data.disorders);
    let phobia = getRandomElement(data.phobia);
    let drug = getRandomElement(data.drugs);
    let instruction = getRandomElement(data.instructions);

   let description = `Your analysis is done. You have ${symptoms},${disorders} and ${phobia}. You need ${drug},and you should ${instruction}.`;
    $('#explain').text(description);

}


function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
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

function buyStuff(){
  inputText = $("#myInput").val();
  $('#explain').text("Thanks for your order! We will comfirm the order and deliver it to your home soon");
  responsiveVoice.speak('We have got your message:'+inputText, 'UK English Female', {
    pitch: 1,
    rate: 0.6,
    volume: 10,

  });

}

function shopping(){
  $('#explain').show();
  $('#explain').text('Welcome to the online shopping center! Please input your oder below. We will report spam texts or illegal deals to the police.');
  $('#shopping').show();
  $('#myInput').show();
  $('#myNumber').show();
  $('#buyStuff').show();
  $('#bigscreen').show();
  $('#screen2').hide();
  $('#buttonShop').hide();

}

function goHome(){
  $('#home').show();
  $('#screen3').hide();
       if (annyang) {
         let lighten = {

            'turn on *the light': function() {
$('#home').css('zIndex',5);

           }
         }; //end of let commands

         let tv={'*verb tv':function(){
           $('#robot0').show();
           $('#robot1').show();
           $('#robot2').show();


         }
       }
         annyang.addCommands(lighten);
         annyang.addCommands(tv);
         annyang.start();

       } //end of if annyang
   } //end of speak function

function report(){
    $.getJSON('data/data.json',gotData);
    $('#checking').attr('src', 'assets/images/result.jpg');
  }
function checkup(){


  $('#humanBody').show();
$('#screen4').hide();
$('#buttonHospital').hide();
$('#checkup').show();
$('#checkup').droppable({
drop: function( event, ui ){
$('#humanBody').remove();
$('#checking').show();
  setTimeout(report,8000);
}

});

$('#humanBody').draggable();
}
