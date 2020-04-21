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
let yourname="";



let iQ = ' You have not done IQ test. ';
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
let bossImg =  'assets/images/boss1.png';

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
function displayButton(buttonId,top,left) {
  buttonId.show();
  buttonId.css('top',top);
  buttonId.css('left',left);

}

function displayText(content,width,height,top,left,fontSize) {
  $('#explain').text(content);
  $('#explain').css('width',width);
  $('#explain').css('height',height);
  $('#explain').css('top',top);
  $('#explain').css('left',left);
  $('#explain').css('fontSize',fontSize);
}


function displayImg(imgId, width,height,top,left) {
  $('#imgContainer').attr('src', imgId);
  $('#imgContainer').show();
  $('#imgContainer').css('width',width);
  $('#imgContainer').css('height',height);
  $('#imgContainer').css('top',top);
  $('#imgContainer').css('left',left);
}

function displayAlert(){
 alert(alertText);
 $('#backColor').hide();

}


function gotData(data) {

  let symptoms = getRandomElement(data.symptoms);
  let disorders = getRandomElement(data.disorders);
  let phobia = getRandomElement(data.phobia);
  let drug = getRandomElement(data.drugs);
  let instruction = getRandomElement(data.instructions);

  healthInfo = `Your health analysis is done. You have ${symptoms}, ${disorders} and ${phobia}. You need ${drug}, and you should ${instruction}.`;


  let name = getRandomElement(data.names);
  yourname=`${name}`;
  let idNumber = Math.floor(Math.random() * 10000000)+10000;

  id = ` Your name: ${name}. Your Id number : ${idNumber}. `;


}


function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function enterScreen(screen, button) {

  $(screen).click(
    function() {

      $(screen).css('width', '40vw');
      $(screen).css('height', '50vh');
      $(screen).css('zIndex', '3');
      $('#backColor').show();
      button.show();
      button.position({
        my: "left top",
        at: "left top",
        of: screen

      });


    });




  button.click(function() {

    $(screen).removeAttr('style');
    button.hide();


  });


}


function moveDrone() {

  if(registered){
  displayText('Press ASDW to move the drone. Press Enter key to finish the deliver','20vw','20vh','60%','70%');
  $('#backColor').css('opacity', 0.5);

  $(document).keydown(function(e) {

    resetDrone();
    var code = e.keyCode || e.which;
    switch (code) {

      case 37:
        $("#screen1").animate({
          left: "-=25"
        });

        break;
      case 40:
        $("#screen1").animate({
          top: "+=25"
        });
        break;
      case 39:
        $("#screen1").animate({
          left: "+=25"
        });
        break;
      case 38:
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
      
    }
  });

}
else{displayAlert();}

}



function resetDrone() {


  var w = window.innerWidth;
  var h = window.innerHeight;

  let droneX = $('#screen1').offset();

  if (droneX.left < 0 || droneX.left > w || droneX.top < 0 || droneX.top > h) {
    $("#screen1").finish().css('top', '50%').css('left', '50%');
    alert('You have moved out of the edge! We will send the drone back to the center');
  }
}




function checkData() {
  if (registered) {
    let infos = id + ' Your IQ info: ' + iQ;
    let toDo = '';
    if (healthCheck) {
      infos = infos + healthInfo;
    } else {
      toDo = ' You have not done medical checkup. ';
    }
    if(jobGot){
      displayImg(chosenJob,'20vw','20vh','10%','75%');
      infos = infos + ' Your job is recorded in the image. ';

    }
    else if (!learnState) {
      toDo = toDo + ' You have not finished your learning and you dont have a job.';
    }
    else{  toDo = toDo + ' You have finished your learning but you dont have a job. ';}

    if (buyState) {
      infos = infos + ' You went to the shop, and you left a message: ' + inputText;

    } else {
      toDo = toDo + ' You have not ordered anything in the shopping center. ';
    }

    if (tvOn) {
      infos = infos + ' You went back home and turn on the light and watched robots Tv show.';
    }

    if (!tvOn && lightOn) {
      infos = infos + ' You went back home and turn on the light, but you didnt watch Tv show. ';
    } else if (!tvOn && !lightOn) {
      infos = infos + ' You have not used the smart serves at home. ';
    }

    if(droneUsed){
      infos=infos+ ' You have used smart drone to deliver your stuff. ';
    }

    else{toDo=toDo+ ' You have not tried drone. ';}
    textContent=infos + toDo;
    console.log(textContent);
   displayText(textContent,'60vw','60vh','10%','10%','1.5vw');
     $('#bossImg').show();
    displayButton($('#exitButton'),'80%','50%');
  } else {
    displayAlert();
  }



}


function getJob() {

  if (iQ == ' You have not done IQ test. ') {
    alert('Please go to the education center firstly');
    $('#backColor').hide();
  } else if (iQ < 100) {
    $('#explain').text('Your IQ is: ' + iQ);
    displayImg(sorryImg);
    displayButton($('#exitButton'),'70%','50%');

  } else if (iQ > 100) {
    $('#explain').text('Hello,you are very smart so we invite you to join our AI team! ');
    $('.flexContainer').css('display', 'flex');
    $('span').click(
      function(e) { //$('div').hide();
        chosenJob = $(this).find('img').attr('src');

        $('.flexContainer').hide();
        displayImg(chosenJob,'25vw','20vh');
        displayButton($('#exitButton'),'70%','50%');
        $('#explain').text('Congradulations! You have a job now ');
      jobGot=true;
      });

  }

}

function getId() {

  if (!registered) {


    $('#police').show();
    $('#explain').text(id + '.  We have you in the system and you can walk around now');
    displayImg(dataImg);


    displayButton($('#exitButton'),'30%','60%');
    registered = true;
  } else {
    alert('You already have an Id.No need to come again');
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

    textContent='Welcome to the online shopping center! Please input your oder below. We will report spam texts or illegal deals to the police.';

    displayText(textContent,'22vw','40vh','10%','73%','1.5vw');
    displayImg(shopimg);
    displayButton($('#exitButton'),'75%','75%');
    $('#myInput').show();
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

    textContent = "Hello "+yourname +". Welcome back your smart home! You can control the eletronic devices by your voices. " +
    " I am your personal robot assistant Alex,and I will show you how to enjoy your home. Now, say 'Turn on the light' to lighten the room ";
    activateAnnyang();

  } else {
    textContent = "I am your personal robot assistant Alex. I want to remind you that you dont have a digital id for using the smart serves. Please go to the police station firstly. See you later";
  }
  displayText(textContent,'40vw','30vh','60%','30%','1.5vw');

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
       displayText("Now say 'watch Tv' to watch Tv",'20vw','40vh','65%','10%','2vw');
      }
    }; //end of let commands

    let tv = {
      '*verb tv': function() {
        $('#robot0').show();
        $('#robot1').show();
        $('#robot2').show();
        tvOn = true;
        responsiveVoice.speak('The annual robot marathon is on the air!Guess who is the winner this time! now all our channels are reporting this event.Enjoy it! ', 'UK English Male', {
          pitch: 4,
          rate: 1.2,
          volume: 12,

        });

        displayText("You have done it! Do you enjoy your home?");
      }
    }

    annyang.addCommands(lighten);
    annyang.addCommands(tv);
    annyang.start();

  } //end of if annyang



}

function report() {
  healthCheck = true;
  $('#reportButton').hide();

  $('#explain').text(healthInfo);
  displayImg(checkimg);

}

function checkup() {

   if (registered) {
     textContent="Welcome to our smart hospital ! Our lastest machine has accurate scaning function!"+
     " It will analyze your DNA to detect any potential illness and give you advices.To have a try, drag the body image into the machine and get your report. ";
    displayText(textContent,'34vw','50vh','20%','60%','2vw');
    displayButton($('#exitButton'),'77%','70%');
    $('#checkup').show();
    dragdrop($('#humanBody'), $('#checkup'), $('#reportButton'), checking);
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
      displayImg(newImg);
      itemdrag.removeAttr('style'); //reset
      itemdrop.removeAttr('style');

    }
  });


}

function learning() {
  if(registered){
    if(!learnState){

  displayImg(mindImg);
  textContent = 'Our AI expert is analyzing your IQ...Please be patient';
  $('#explain').text(textContent);
  iQ = Math.floor(Math.random() * 50) + 70;


  setTimeout(function() {
    displayButton($('#exitButton'),'59%','52%');
    $('#explain').text("Your IQ is: " + iQ +
      ". Our result suggests that your are below the average iQ in our society,but here is a way to improve it!" +
      " Drag the chip into your brain, and you will be smart than ever");
    dragdrop($('#chip'), $('#imgContainer'), $('#startlearn'));

  }, 5000);

}

else{alert('You have finished your learning!');
      $('#backColor').hide();}
}

else{ displayAlert();}
}

function learnEffect() {
  $('#startlearn').hide();
  learnState = true;
  iQ = iQ * 2;
  displayImg(brainImg);
  let thisInfo = "Congradulations! Your new IQ is: " + iQ + ". You are as smart as AI now!";
  $('#explain').text(thisInfo);
}


function quit() {
  $('img').removeAttr('style');
  $('div').removeAttr('style');
  $('button').removeAttr('style');
  $("#explain").text("");
  $("#myInput").hide();

}
