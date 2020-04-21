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
let info="";
let healthInfo;

let iQ=0;
let healthCheck=false
let learnState=false;
let chosenJob="";

let shopimg="./assets/images/shop.jpg";
let checkimg='assets/images/result.jpg';
let checking='assets/images/hospital.gif';
let mindImg='assets/images/mind.png';
let brainImg='assets/images/brain.jpg';
let dataImg='assets/images/id.gif';
let sorryImg='assets/images/sorryscreen.jpg';

let alertText='You dont have a legal digital ID to access our serves.Please go to the police office firstly';
$(document).ready(setup);


function setup() {
  responsiveVoice.speak("Welcome to the year 2040 ", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });





  // $( "#screen1" ).keydown(function( e ) {
  // var code = e.keyCode || e.which;
  // if ( code == 65){
  //   alert('hello');
  //   //$( "#screen1" ).animate({
  //    //left: "+=50",
  // }
  // else{alert('hello');}
  //
  //
  // });

$('#explain').text(textContent);

enterScreen('#screen2',$("#buttonShop"));
enterScreen('#screen3',$("#buttonHome"));
enterScreen('#screen4',$("#buttonHospital"));
enterScreen('#screen7',$("#buttonPolice"));
enterScreen('#screen8',$("#exitButton"));
enterScreen('#screen1',$("#droneButton"));
enterScreen('#screen6',$("#learnButton"));
enterScreen('#screen9',$("#jobButton"));
enterScreen('#screen5',$("#dataCenter"));
}

function displayImg(imgId,showExit){
  $('#imgContainer').attr('src', imgId);
  $('#imgContainer').show();
  if(showExit=='yes'){
  $('#exitButton').show();
}
}



function gotData(data){

    let symptoms = getRandomElement(data.symptoms);
    let disorders = getRandomElement(data.disorders);
    let phobia = getRandomElement(data.phobia);
    let drug = getRandomElement(data.drugs);
    let instruction = getRandomElement(data.instructions);

   healthInfo = `Your health analysis is done. You have ${symptoms},${disorders} and ${phobia}. You need ${drug},and you should ${instruction}.`;
    $('#explain').text(healthInfo);

}

function gotId(data){

   let name = getRandomElement(data.names);
   let id = Math.floor(Math.random(10000) * 10000000);

    info= ` Your name: ${name}. Your Id number: ${id}`;
    $('#explain').text(info+' Now we have you in the system and you can walk around');
   $('#explain').show();

}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function enterScreen(screen,button){

$(screen).click(
  function() {$(screen).css('width','40vw');
              $(screen).css('height','40vh');
             $(screen).css('zIndex','3');
             $('#backColor').show();
             button.show();
             button.position({
                           my: "left bottom",
                           at: "left bottom",
                           of: screen
                           });


});




  button.click(function () {

              $(screen).css('width','9vw');
            $(screen).css('height','10vh');
              $(screen).css('zIndex','1');
             button.hide();


});


}

function checkData(){
  if(registered){
 let infos=info;let toDo='';
    if(healthCheck){
      infos=infos+healthInfo;
    }
    else{toDo='You have not done medical checkup\n';
    }
    if(!learnState){
      toDo=toDo+ ' You have not finished your learning';
    }


$('#explain').text(infos+toDo);
$('#explain').show();
}
else {alert(alertText);
   $('#backColor').hide();
}
//textContent=info + 'Your IQ:' + iQ;



}


function getJob(){
  $('#exitButton').show();
if(iQ==0){
  alert(alertText);
  $('#backColor').hide();
}

else if (iQ<100){
  $('#explain').text('Your IQ is: ' + iQ );
  displayImg(sorryImg);
}

else if(iQ>100){
$('#explain').text('Hello,you are very smart so we invite you to join our AI team! ');
$('.flexContainer').css('display','flex');

$('span').click(
  function(e){ //$('div').hide();
chosenJob=$(this).find('img').attr('src');

alert(chosenJob);
$('.flexContainer').hide();
$('#imgContainer').attr('src',chosenJob);

});

}

}

function getId(){

if(!registered){
displayImg(dataImg,'yes');
  $.getJSON('data/data.json',gotId);
$('#police').show();
 registered=true;
}
else{alert(alertText);
   $('#backColor').hide();
     }
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
   displayImg(shopimg,'yes');
  $('#myInput').show();
  $('#myNumber').show();
  $('#buyStuff').show();
  $('#bigscreen').show();



}
else{ alert(alertText);
$('#backColor').hide();
            }
}

function goHome(){
  $('#robotAssistant').show();
  $('#home').show();
  //$('#screen3').hide();
   $('#exitButton').show();

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
  $('#home').css('zIndex',3);

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
   healthCheck=true;
  $('#checkinButton').hide();
    $.getJSON('data/data.json',gotData);
  displayImg(checkimg);

  }
function checkup(){

if(registered)
{

var info='Our machine is checking';

    $('#checkup').show();
  dragdrop($('#humanBody'),$('#checkup'),$('#checkinButton'),checking);

}





else{$('#backColor').hide();alert('sorry, without a digital id,you cannot use our advanced serves, please go to the police firstly ');}
}


function learning(){

displayImg(mindImg);
textContent='Our AI expert is analyzing your IQ...';
$('#explain').text(textContent);
iQ = Math.floor(Math.random(70) * 100);

//newIq=iQ*2;

setTimeout(function(){

$('#explain').text("your IQ is: "+ iQ+
"Our result suggests your are below the average iQ in our society,but here is a way to improve it!"+
"drag the chip into your brain, and you will be smart than ever");
dragdrop($('#chip'),$('#imgContainer'),$('#startlearn'));

},5000);


}

function learnEffect(){
  $('#startlearn').hide();
  learnState=true;
  iQ=iQ*2;
  displayImg(brainImg,'yes');
  let thisInfo="congradulation! Your new IQ is: " + iQ+ " You are as smart as AI now!";
  $('#explain').text(thisInfo);
}

function dragdrop(itemdrag,itemdrop,button,newImg){
    itemdrag.show();
  itemdrag.draggable();
 itemdrop.droppable({
drop: function( event, ui ){
    button.show();
    displayImg(newImg,'yes');
   itemdrag.removeAttr('style');//reset
   itemdrop.removeAttr('style');

 }
});


}
function quit(){
  $("#home").hide();
  $("#home").css('zIndex','1');
  $("#robot0").hide();
  $("#robot1").hide();
  $("#robot2").hide();
  $("#robotAssistant").hide();
$('#backColor').css('zIndex','2');
$('#backColor').hide();
$("#imgContainer").hide();
$("#result").hide();
$("#explain").text("");
$('#exitButton').hide();
$('#police').hide();
$("#bigscreen").hide();
$("#myInput").hide();
$("#buyStuff").hide();
$('#chip').hide();
}
