"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let inputText="";
let registered=false;
let textContent="";
let name="";
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
enterScreen($('#police'),$("#buttonPolice"));


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

function gotId(data){
 alert('hello');
    name = getRandomElement(data.names);
   let id = Math.floor(Math.random(10000) * 10000000);

   let info= ` Your name: ${name}. Your Id number: ${id}. Now we have you in the system and you can walk around`;
    $('#explain').text(info);
   $('#explain').show();
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
                           my: "left top",
                           at: "left top",
                           of: screen
                           });


});




  $(screen).click(function () {
              $('#backColor').hide();
              $(screen).css('width','9vw');
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
function getId(){
$('#loading').show();
  $.getJSON('data/data.json',gotId);

 registered=true;

}

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
  if(registered){ // cannot get in without an digital id
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
else{ alert('Sorry, you cannot go shopping without a digital id, please go to the police firstly');}
}

function goHome(){
  $('#robotAssistant').show();
  $('#home').show();
  $('#screen3').hide();


  if(registered){

    textContent="Hello "+ name + " Welcome back your smart home! You can use your voices to control the stuff.I am your personal robot assistant Alex,and I will show you how to enjoy your home,";
   activateAnnyang();

   }
   else{
   textContent="I am your personal robot assistant Alex,I want to remind you that you dont have an id for using the smart serves, please go to the police firstly.See you later";
}
$('#explain').text(textContent);
$('#explain').show();
responsiveVoice.speak(textContent, 'UK English Male', {
  pitch: 4,
  rate: 1,
  volume: 10,

});
}

function activateAnnyang(){
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



}
function report(){
    $.getJSON('data/data.json',gotData);
    $('#checking').attr('src', 'assets/images/result.jpg');
    $('#explain').show();
  }
function checkup(){
if(registered)
{
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

else{alert('sorry, without a digital id,you cannot use our advanced serves, please go to the police firstly ');}
}
