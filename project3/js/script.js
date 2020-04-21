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
let buyState=false;
let chosenJob="";
let lightOn=false;
let tvOn=false;

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

enterScreen('#screen2',$("#buttonShop"));
enterScreen('#screen3',$("#buttonHome"));
enterScreen('#screen4',$("#buttonHospital"));
enterScreen('#screen7',$("#buttonPolice"));
enterScreen('#screen1',$("#droneButton"));
enterScreen('#screen6',$("#learnButton"));
enterScreen('#screen8',$("#jobButton"));
enterScreen('#screen5',$("#dataCenter"));

}

function displayImg(imgId,showExit){
  $('#imgContainer').attr('src', imgId);
  $('#imgContainer').show();
  if(showExit=='yes'){
  $('#exitButton').show();
}
}



function moveDrone(){$('#backColor').css('opacity',0.5);
  $(document).keydown(function( e ) {resetDrone();
  var code = e.keyCode || e.which;
  switch (code) {

  case 65:
  $( "#screen1" ).animate({left: "-=25" });

  break;
 case 83:
$( "#screen1" ).animate({top: "+=25" });
break;
  case 68:
$( "#screen1" ).animate({left: "+=25" });
break;
case 87:
$( "#screen1" ).animate({top: "-=25" });
break;
case 13:
$( "#screen1" ).removeAttr('style');
alert('Your have successifully delivered your stuff!');
$(exitButton).show();
break;
default:
     alert('Oops! You cannot move this way');
}
});

}


function resetDrone(){


var w = window.innerWidth;
var h = window.innerHeight;

let droneX= $('#screen1').offset();
console.log(droneX.left);
console.log(w);
if(droneX.left<0||droneX.left>w||droneX.top<0||droneX.top>h){
$( "#screen1" ).finish().css('top', '50%').css('left', '50%');
  alert('You have moved out of the edge!Press');
 }
}



function gotData(data){

    let symptoms = getRandomElement(data.symptoms);
    let disorders = getRandomElement(data.disorders);
    let phobia = getRandomElement(data.phobia);
    let drug = getRandomElement(data.drugs);
    let instruction = getRandomElement(data.instructions);

   healthInfo = `Your health analysis is done. You have ${symptoms},${disorders} and ${phobia}. You need ${drug},and you should ${instruction}.`;
    //

    let name = getRandomElement(data.names);
    let id = Math.floor(Math.random(10000) * 10000000);

     info= ` Your name: ${name}. Your Id number: ${id}`;
    //  $('#explain').text(info+' Now we have you in the system and you can walk around');
    // $('#explain').show();


}

// function gotId(data){
//
//    let name = getRandomElement(data.names);
//    let id = Math.floor(Math.random(10000) * 10000000);
//
//     info= ` Your name: ${name}. Your Id number: ${id}`;
//     $('#explain').text(info+' Now we have you in the system and you can walk around');
//    $('#explain').show();
//
// }

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

              $(screen).removeAttr('style');
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
    else{ infos=infos+ ' Your job is recorded in the image';
      $('#imgContainer').show();
    $('#imgContainer').attr('src',chosenJob);}
    if(buyState){
    infos=infos + ' You went to the shop, and you left a message: ' + inputText;

    }
   else{toDo=toDo+'You have not ordered anything in the shopping center';}

   if(tvOn){
     infos=infos+ ' You went back home and turn on the light and watched robots Tv show';
}

 if(!tvOn&&lightOn){
  infos=infos + ' You went back home and turn on the light, but you didnt watch Tv show';
}
  else if(!tvOn&&!lightOn){ infos=infos+ ' You have not used the smart serves at home';}

$('#explain').text(infos+toDo);
$('#explain').show();
}
else {alert(alertText);
   $('#backColor').hide();
}



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
  $.getJSON('data/data.json',gotData);
$('#police').show();
 registered=true;
 $('#explain').text(info+' Now we have you in the system and you can walk around');

}
else{alert(alertText);
   $('#backColor').hide();
     }
}

function buyStuff(){
  buyState=true;
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
  lightOn=true;
      }
    }; //end of let commands

    let tv={'*verb tv':function(){
      $('#robot0').show();
      $('#robot1').show();
      $('#robot2').show();
     tvOn=true;

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
        $('#explain').text(healthInfo);
  displayImg(checkimg);

  }
function checkup(){

if(registered)
{

var info='Our machine is checking';

    $('#checkup').show();
  dragdrop($('#humanBody'),$('#checkup'),$('#checkinButton'),checking);

}


else{$('#backColor').hide();
alert(alertText);}
}


function learning(){

displayImg(mindImg);
textContent='Our AI expert is analyzing your IQ...';
$('#explain').text(textContent);
iQ = Math.floor(Math.random() * 50)+70;


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
  $('img').removeAttr('style');
  $('div').removeAttr('style');
  $('button').removeAttr('style');
$("#explain").text("");
 $("#myInput").hide();

}
