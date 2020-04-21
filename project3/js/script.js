"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let inputText = "";
let registered = false;
let textContent = "";
let chosenJob = "";
let id = "";
let healthInfo;

let iQ = 'unknow';
let healthCheck = false
let learnState = false;
let buyState = false;
let lightOn = false;
let tvOn = false;
let droneUsed=false;
let jobGot=false;

let shopimg = "./assets/images/shop.jpg";
let checkimg = 'assets/images/result.jpg';
let checking = 'assets/images/hospital.gif';
let mindImg = 'assets/images/mind.png';
let brainImg = 'assets/images/brain.jpg';
let dataImg = 'assets/images/id.gif';
let sorryImg = 'assets/images/sorryscreen.jpg';

let alertText = 'You dont have a legal digital ID to access our serves.Please go to the police office firstly';


$(document).ready(setup);

function setup() {
  responsiveVoice.speak("Welcome to the year 2040 ", 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });

    $.getJSON('data/data.json', gotData);

  enterScreen('#screen2', $("#buttonShop"));
  enterScreen('#screen3', $("#buttonHome"));
  enterScreen('#screen4', $("#buttonHospital"));
  enterScreen('#screen7', $("#buttonPolice"));
  enterScreen('#screen1', $("#droneButton"));
  enterScreen('#screen6', $("#learnButton"));
  enterScreen('#screen8', $("#jobButton"));
  enterScreen('#screen5', $("#dataCenter"));

}

function displayImg(imgId, showExit,width,height) {
  $('#imgContainer').attr('src', imgId);
  $('#imgContainer').show();
  $('#imgContainer').css('width',width);
  $('#imgContainer').css('height',height);
  if (showExit == 'yes') {
    $('#exitButton').show();
  }
  else{$('#exitButton').show();}
}



function moveDrone() {
  if(registered){
  $('#backColor').css('opacity', 0.5);
  $(document).keydown(function(e) {
    resetDrone();
    var code = e.keyCode || e.which;
    switch (code) {

      case 65:
        $("#screen1").animate({
          left: "-=25"
        });

        break;
      case 83:
        $("#screen1").animate({
          top: "+=25"
        });
        break;
      case 68:
        $("#screen1").animate({
          left: "+=25"
        });
        break;
      case 87:
        $("#screen1").animate({
          top: "-=25"
        });
        break;
      case 13:
        $("#screen1").removeAttr('style');
        alert('Your have successifully delivered your stuff!');
        $(exitButton).show();
        droneUsed=true;
        break;
      default:
        alert('Oops! You cannot move this way');
    }
  });

}
else{displayAlert();}

}

function displayAlert(){
 alert(alertText);
 $('#backColor').hide();

}

function resetDrone() {


  var w = window.innerWidth;
  var h = window.innerHeight;

  let droneX = $('#screen1').offset();
  console.log(droneX.left);
  console.log(w);
  if (droneX.left < 0 || droneX.left > w || droneX.top < 0 || droneX.top > h) {
    $("#screen1").finish().css('top', '50%').css('left', '50%');
    alert('You have moved out of the edge!');
  }
}



function gotData(data) {

  let symptoms = getRandomElement(data.symptoms);
  let disorders = getRandomElement(data.disorders);
  let phobia = getRandomElement(data.phobia);
  let drug = getRandomElement(data.drugs);
  let instruction = getRandomElement(data.instructions);

  healthInfo = `Your health analysis is done. You have ${symptoms},${disorders} and ${phobia}. You need ${drug},and you should ${instruction}.`;
  //

  let name = getRandomElement(data.names);
  let idNumber = Math.floor(Math.random() * 10000000+10000);

  id = ` Your name: ${name}. Your Id number: ${idNumber}`;
  //  $('#explain').text(info+' Now we have you in the system and you can walk around');
  // $('#explain').show();


}


function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function enterScreen(screen, button) {

  $(screen).click(
    function() {
      $(screen).css('width', '40vw');
      $(screen).css('height', '40vh');
      $(screen).css('zIndex', '3');
      $('#backColor').show();
      button.show();
      button.position({
        my: "left bottom",
        at: "left bottom",
        of: screen

      });


    });




  button.click(function() {

    $(screen).removeAttr('style');
    button.hide();


  });


}

function checkData() {
  if (registered) {
    let infos = id + iQ;
    let toDo = '';
    if (healthCheck) {
      infos = infos + healthInfo;
    } else {
      toDo = 'You have not done medical checkup\n';
    }
    if(jobGot){
      infos = infos + ' Your job is recorded in the image';
      $('#imgContainer').show();
      $('#imgContainer').attr('src', chosenJob);
    }
    else if (!learnState) {
      toDo = toDo + ' You have not finished your learning and you dont have a job';
    }
    else{  toDo = toDo + ' You have finished your learning but you dont have a job';}

    if (buyState) {
      infos = infos + ' You went to the shop, and you left a message: ' + inputText;

    } else {
      toDo = toDo + 'You have not ordered anything in the shopping center';
    }

    if (tvOn) {
      infos = infos + ' You went back home and turn on the light and watched robots Tv show';
    }

    if (!tvOn && lightOn) {
      infos = infos + ' You went back home and turn on the light, but you didnt watch Tv show';
    } else if (!tvOn && !lightOn) {
      infos = infos + ' You have not used the smart serves at home';
    }

    if(droneUsed){
      infos=infos+ ' You have used smart drone to deliver your stuff';
    }

    else{toDo=toDo+ 'You have not tried drone';}
    $('#explain').text(infos + toDo);

  } else {
    displayAlert();
  }



}


function getJob() {

  if (iQ == 'unknow') {
    alert('Please go to the education center firstly');
    $('#backColor').hide();
  } else if (iQ < 100) {
    $('#explain').text('Your IQ is: ' + iQ);
    displayImg(sorryImg,'yes');
  } else if (iQ > 100) {
    $('#explain').text('Hello,you are very smart so we invite you to join our AI team! ');
    $('.flexContainer').css('display', 'flex');
    $('span').click(
      function(e) { //$('div').hide();
        chosenJob = $(this).find('img').attr('src');

        $('.flexContainer').hide();
        displayImg(chosenJob,'yes','25vw','20vh');
      jobGot=true;
      });

  }

}

function getId() {

  if (!registered) {

    $('#police').show();
    $('#explain').text(id + ' We have you in the system and you can walk around now');
    displayImg(dataImg, 'yes');
    registered = true;
  } else {
    alert('You have already an Id.No need to come again');
    $('#backColor').hide();
  }
}

function buyStuff() {
  buyState = true;
  inputText = $("#myInput").val();
  $('#explain').text("Thanks for your order! We will comfirm the order and deliver it to your home soon");
  responsiveVoice.speak('We have got your message:' + inputText, 'UK English Female', {
    pitch: 1,
    rate: 0.6,
    volume: 10,

  });

}

function shopping() {

  if (registered) { // cannot get in without an digital id
  
    $('#explain').text('Welcome to the online shopping center! Please input your oder below. We will report spam texts or illegal deals to the police.');
    displayImg(shopimg, 'yes');
    $('#myInput').show();
    $('#myNumber').show();
    $('#buyStuff').show();
    $('#bigscreen').show();



  } else {
    displayAlert();
  }
}

function goHome() {
  $('#robotAssistant').show();
  $('#home').show();
  $('#exitButton').show();

  if (registered) {

    textContent = "Hello " + name + " Welcome back your smart home! You can use your voices to control the stuff.I am your personal robot assistant Alex,and I will show you how to enjoy your home,";
    activateAnnyang();

  } else {
    textContent = "I am your personal robot assistant Alex,I want to remind you that you dont have an id for using the smart serves, please go to the police firstly.See you later";
  }
  $('#explain').text(textContent);

  responsiveVoice.speak(textContent, 'UK English Male', {
    pitch: 4,
    rate: 1,
    volume: 10,

  });
}

function activateAnnyang() {
  if (annyang) {
    let lighten = {

      'turn on *the light': function() {
        $('#home').css('zIndex', 3);
        lightOn = true;
      }
    }; //end of let commands

    let tv = {
      '*verb tv': function() {
        $('#robot0').show();
        $('#robot1').show();
        $('#robot2').show();
        tvOn = true;

      }
    }
    annyang.addCommands(lighten);
    annyang.addCommands(tv);
    annyang.start();

  } //end of if annyang



}

function report() {
  healthCheck = true;
  $('#checkinButton').hide();

  $('#explain').text(healthInfo);
  displayImg(checkimg);

}

function checkup() {

  if (registered) {

    var info = 'Our machine is checking';
    $('#checkup').show();
    dragdrop($('#humanBody'), $('#checkup'), $('#checkinButton'), checking);
    }

   else {
displayAlert();
  }
}

function dragdrop(itemdrag, itemdrop, button, newImg) {
  itemdrag.show();
  itemdrag.draggable();
  itemdrop.droppable({
    drop: function(event, ui) {
      button.show();
      displayImg(newImg, 'yes');
      itemdrag.removeAttr('style'); //reset
      itemdrop.removeAttr('style');

    }
  });


}

function learning() {
  if(registered){

  displayImg(mindImg);
  textContent = 'Our AI expert is analyzing your IQ...';
  $('#explain').text(textContent);
  iQ = Math.floor(Math.random() * 50) + 70;


  setTimeout(function() {

    $('#explain').text("your IQ is: " + iQ +
      "Our result suggests your are below the average iQ in our society,but here is a way to improve it!" +
      "drag the chip into your brain, and you will be smart than ever");
    dragdrop($('#chip'), $('#imgContainer'), $('#startlearn'));

  }, 5000);

}

else{ displayAlert();}
}

function learnEffect() {
  $('#startlearn').hide();
  learnState = true;
  iQ = iQ * 2;
  displayImg(brainImg, 'yes');
  let thisInfo = "congradulation! Your new IQ is: " + iQ + " You are as smart as AI now!";
  $('#explain').text(thisInfo);
}


function quit() {
  $('img').removeAttr('style');
  $('div').removeAttr('style');
  $('button').removeAttr('style');
  $("#explain").text("");
  $("#myInput").hide();

}
