"use strict";

/********************************************************************

Travel to Smart city in the future
Avery Deng



*********************************************************************/


let inputText = ""; // get input from player in the shopping center
let textContent = ""; // instructions and descriptions
let chosenJob = ""; // get the job player chose
let id = ""; // define id
let healthInfo; // get health report
let yourname = ""; // name from json data


//added tracking elements
let registered = false; // check if went to the police
let healthCheck = false // check if done health checkup
let learnState = false; // check if finished learning
let buyState = false; // check if ordered any thing
let lightOn = false; // check if the light is on at home
let tvOn = false; // check if tv is on at home
let droneUsed = false; // check if used drone
let jobGot = false; // check if get a job

let iQ = ' You have not done IQ test. '; // inital IQ info

//display images. get images from pixably and cleanPNG
let shopimg = "./assets/images/shop.jpg";
let reportImg = 'assets/images/result.jpg';
let checking = 'assets/images/hospital.gif';
let mindImg = 'assets/images/mind.png';
let brainImg = 'assets/images/brain.jpg';
let dataImg = 'assets/images/id.gif';
let sorryImg = 'assets/images/sorryscreen.jpg';
let bossImg = 'assets/images/boss1.png';

// show alert when players dont have an id
let alertText = 'You dont have a legal digital ID to access our serves.Please go to the police office firstly';


$(document).ready(setup);

//function setup the cover image
function setup(){
  //display cover img
   $('.background').attr('src', './assets/images/cover.jpg');
   $('#startJourney').show();
}
//start the game
function startJourney() {
  alert('You are about to travel to the future. Click the images to explore!');
  // change background
 $('.background').attr('src', './assets/images/city0.jpg');
 $('#startJourney').hide();
  // welcome information
  responsiveVoice.speak('Welcome to the year 2040. Click the images to explore!', 'UK English Male', {
    pitch: 0.6,
    rate: 0.6,
    volume: 10,

  });

  // get json data
  $.getJSON('data/data.json', gotData);

  // call functions when players move mouth to the screen images
  enterScreen('#screen2', $("#buttonShop")); // shopping center
  enterScreen('#screen3', $("#buttonHome")); // smart home
  enterScreen('#screen4', $("#buttonHospital")); // hospital
  enterScreen('#screen7', $("#buttonPolice")); // police station
  enterScreen('#screen1', $("#droneButton")); // drone section
  enterScreen('#screen6', $("#learnButton")); // study image
  enterScreen('#screen8', $("#jobButton")); // job market
  enterScreen('#screen5', $("#dataCenter")); // data tracking center

}

// set function to display buttons while setting the location
function displayButton(buttonId, top, left) {
  buttonId.show();
  buttonId.css('top', top);
  buttonId.css('left', left);

}

// set functions to display text and set position,size
function displayText(content, width, height, top, left, fontSize) {
  $('#explain').text(content);
  $('#explain').css('width', width);
  $('#explain').css('height', height);
  $('#explain').css('top', top);
  $('#explain').css('left', left);
  $('#explain').css('fontSize', fontSize);
}

//set functions to display images while setting size and position
function displayImg(imgId, width, height, top, left) {
  $('#imgContainer').attr('src', imgId); // display images
  $('#imgContainer').show();
  $('#imgContainer').css('width', width);
  $('#imgContainer').css('height', height);
  $('#imgContainer').css('top', top);
  $('#imgContainer').css('left', left);
}

// display alert and close the background
function displayAlert() {
  alert(alertText);
  $('#backColor').hide();

}


// get data from json
function gotData(data) {

  // get random health report
  let symptoms = getRandomElement(data.symptoms);
  let disorders = getRandomElement(data.disorders);
  let phobia = getRandomElement(data.phobia);
  let drug = getRandomElement(data.drugs);
  let instruction = getRandomElement(data.instructions);
  // store the info
  healthInfo = `Your health analysis is done. You have ${symptoms}, ${disorders} and ${phobia}. You need ${drug}, and you should ${instruction}.`;

  //get random ID info
  let name = getRandomElement(data.names);
  yourname = `${name}`;
  let idNumber = Math.floor(Math.random() * 10000000) + 10000;

  id = ` Your name: ${name}. Your Id number : ${idNumber}. `;


}

// get random data for json
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// set the display when players move the mouth and click on the images
function enterScreen(screen, button) {

  $(screen).click(
    function() {

      $(screen).css('width', '40vw'); // change img size
      $(screen).css('height', '50vh');
      $(screen).css('zIndex', '3'); // change index
      $('#backColor').show(); //display background

      //display button and set the position related to the image
      button.show();
      button.position({
        my: "left top",
        at: "left top",
        of: screen

      });

    });

  // now set the effect when button is clicked
  button.click(function() {

    $(screen).removeAttr('style'); // reset images to original style
    button.hide(); //hide button

  });

}


//functions to move drone
function moveDrone() {
  //firstly check if players go to the police center to get an id
  if (registered) {
    displayText('Press arrow keys to move the drone. Press Enter key to finish the deliver', '20vw', '20vh', '60%', '70%');
    $('#backColor').css('opacity', 0.5); //display background and instructions

    //set key events
    $(document).keydown(function(e) {

      resetDrone(); //reset the location of drone if it is moving off the screen
      var code = e.keyCode || e.which;
      switch (code) {

        case 37: // arrow up
          $("#screen1").animate({
            left: "-=25"
          });
          break;
        case 40: //DOWN_ARROW
          $("#screen1").animate({
            top: "+=25"
          });
          break;
        case 39: //RIGHT_ARROW
          $("#screen1").animate({
            left: "+=25"
          });
          break;
        case 38: //UP_ARROW
          $("#screen1").animate({
            top: "-=25"
          });
          break;
        case 13: //enter when players deliver
          $("#screen1").removeAttr('style'); //reset style
          alert('Your have successifully delivered your stuff!');
          $(exitButton).show(); //display exit button
          droneUsed = true; //change tracking state
          break;

      }
    });

  } else { // if player dont have an id, they are not allowed to use this function
    displayAlert();
  }

}


//reset position of drone
function resetDrone() {

  //get width and height from the screen
  var w = window.innerWidth;
  var h = window.innerHeight;

  let drone = $('#screen1').offset(); // get drone position

  //chekc if drone moving out of the screen
  if (drone.left < 0 || drone.left > w || drone.top < 0 || drone.top > h) {
    $("#screen1").finish().css('top', '50%').css('left', '50%'); //if so stop the move and reset location to center
    alert('You have moved out of the edge! We will send the drone back to the center');
  }
}



// creat a function to track and display the action players have done
function checkData() {
  //check if they registered in the police station
  if (registered) {
    let infos = id + ' Your IQ info: ' + iQ; //display ID info and IQ
    let toDo = ''; // the things they have not done
    //check if they get health report
    if (healthCheck) {
      infos = infos + healthInfo; // added to the display info
    } else {
      toDo = ' You have not done medical checkup. '; // added to undo lists
    }
    //check if they got a job
    if (jobGot) {
      displayImg(chosenJob, '20vw', '20vh', '10%', '75%'); // display job image
      infos = infos + ' Your job is recorded in the image. '; //display info

    } else if (!learnState) { // check if they finished learning(if they accept chips)
      toDo = toDo + ' You have not finished your learning and you dont have a job.'; // if not display info
    } else { // if so, display info
      toDo = toDo + ' You have finished your learning but you dont have a job. ';
    }

    if (buyState) { // check if they submit any message to the shopping center
      infos = infos + ' You went to the shop, and you left a message: ' + inputText;
      // if so display the input text
    } else { // if not display info
      toDo = toDo + ' You have not ordered anything in the shopping center. ';
    }

    if (tvOn) { // check if they use serves at home .firstly chekc if they turn on tv
      infos = infos + ' You went back home and turn on the light and watched robots Tv show.';
    }
    // check if they turned on light
    if (!tvOn && lightOn) {
      infos = infos + ' You went back home and turn on the light, but you didnt watch Tv show. ';
    } else if (!tvOn && !lightOn) { // if they have not used anything
      infos = infos + ' You have not used the smart serves at home. ';
    }
    // check if they used the drone
    if (droneUsed) {
      infos = infos + ' You have used smart drone to deliver your stuff. ';
    } else {
      toDo = toDo + ' You have not used drone. ';
    }

    // finally display both the things they have done and not
    //display text and set the size and position of text
    textContent = infos + toDo;
    displayText(textContent, '60vw', '60vh', '10%', '10%', '1.5vw');
    // display a hide tracker image as if someone is watching
    $('#bossImg').show();
    //display exit button
    displayButton($('#exitButton'), '80%', '20%');
  } else { // if player have not regsisted, they wont have any data
    displayAlert();
  }

}

// function to get job info
function getJob() {
  // check the IQ(randomly given in the education center
  if (iQ == ' You have not done IQ test. ') { // they cannot fina a job without education
    alert('Please go to the education center firstly');
    $('#backColor').hide();
  } else if (iQ < 100) { // if they go to the education and tested IQ, but didnt accept chips
    $('#explain').text('Your IQ is: ' + iQ);
    displayImg(sorryImg); // display img taht refues giving job offers
    displayButton($('#exitButton'), '70%', '50%'); // exit button

  } else if (iQ > 100) { // if they finished getting a chip in the brain
    $('#explain').text('Hello,you are very smart so we invite you to join our AI team! Click one image to select which job you want');
    $('.flexContainer').css('display', 'flex'); // use flexbox to display jobs
    $('span').click( // job images
      function(e) {
        chosenJob = $(this).find('img').attr('src'); // store which image players chose, it will be their job

        $('.flexContainer').hide(); // hide the images
        displayImg(chosenJob, '25vw', '20vh'); // display the chosen job in a larger image
        displayButton($('#exitButton'), '70%', '50%'); //exit button
        $('#explain').text('Congradulations! You have a job now ');
        jobGot = true; // job tracking state
      });

  }

}

// functions to get a random id in police station
function getId() {

  if (!registered) { // they can only get one id, so they can only go there once

    // display infos
    $('#police').show();
    $('#explain').text(id + '  We have you in the system and you can walk around now');
    displayImg(dataImg);

    displayButton($('#exitButton'), '30%', '60%'); // exit button
    registered = true; // they have got an id
  } else {
    alert('You already have an Id. No need to come again');
    $('#backColor').hide(); // hide the background
  }
}

// functions to buy stuff in the shoping center
function buyStuff() {
  buyState = true; // set buy state
  inputText = $("#myInput").val(); // get input

  // display instructions through both text and voice
  $('#explain').text("Thanks for your order! We will comfirm the order and deliver it to your home soon");
  responsiveVoice.speak('We have got your message:' + inputText, 'UK English Female', {
    pitch: 1,
    rate: 0.6,
    volume: 10,

  });

}

// shop section players can input messages
function shopping() {

  if (registered) { // cannot get in without an digital id

    textContent = 'Welcome to the online shopping center! Please input your oder below. We will report spam texts or illegal deals to the police.';

    // display infomation
    displayText(textContent, '22vw', '40vh', '10%', '73%', '1.5vw');
    displayImg(shopimg);
    displayButton($('#exitButton'), '75%', '75%');
    $('#myInput').show(); // input box
    $('#buyStuff').show(); // submit button
    $('#bigscreen').show(); // screen


  } else { // display alert
    displayAlert();
  }
}


// function for home section. voice control function
function goHome() {
  // display robot images
  $('#robotAssistant').show();
  $('#home').show(); // home image
  $('#exitButton').show();

  if (registered) { // players cannot use the devices at home if they dont have an id

    textContent = "Hello " + yourname + ". Welcome back your smart home! You can control the eletronic devices by your voices. " +
      " I am your personal robot assistant Alex,and I will show you how to enjoy your home. Now, say 'Turn on the light' to lighten the room ";
    // call annyang
    activateAnnyang();

  } else { // ask players to go to the police
    textContent = "I am your personal robot assistant Alex. I want to remind you that you dont have a digital id for using the smart serves. Please go to the police station firstly. See you later";
  }

  //display the instruction by text and sounds
  displayText(textContent, '40vw', '30vh', '60%', '30%', '1.5vw');
  responsiveVoice.speak(textContent, 'UK English Male', {
    pitch: 4,
    rate: 1,
    volume: 10,

  });
}

// voice control
function activateAnnyang() {
  if (annyang) {
    let lighten = { // change the zIndex of the background as if the light at home is turning on

      'turn on *the light': function() { // when players say turn on the light
        $('#home').css('zIndex', 3); // change zindex
        lightOn = true; // change state
        // give next instruction
        displayText("Now say 'watch Tv' to watch Tv", '20vw', '40vh', '65%', '10%', '2vw');
      }
    }; //end of this commands

    let tv = {
      '*verb tv': function() { // display gif images in the tv section as if tv is on
        // display robots running as if it is a race
        $('#robot0').show();
        $('#robot1').show();
        $('#robot2').show();
        tvOn = true; // change state
        // giving explain
        responsiveVoice.speak('The annual robot marathon is on the air!Guess who is the winner this time! now all our channels are reporting this event.Enjoy it! ', 'UK English Male', {
          pitch: 4,
          rate: 1.2,
          volume: 12,

        });

        displayText("You have done it! Do you enjoy your home?"); // final message
      }
    }

    annyang.addCommands(lighten); // added annyang commands
    annyang.addCommands(tv);
    annyang.start();

  } //end of if annyang



}

//display health report
function report() {

  healthCheck = true; // change state
  $('#reportButton').hide(); // hide report button

  $('#explain').text(healthInfo); // display info
  displayImg(reportImg); // display image

}

// start checking
function checkup() {

  if (registered) { //firstly check if players go to the police center to get an id
    //if so  display a text as instruction
    textContent = "Welcome to our smart hospital ! Our lastest machine has accurate scaning function!" +
      " It will analyze your DNA to detect any potential illness and give you advices.To have a try, drag the body image into the machine and get your report. ";
    displayText(textContent, '34vw', '50vh', '20%', '60%', '2vw');
    displayButton($('#exitButton'), '77%', '70%');
    $('#checkup').show(); // check up machine img

    // call the functions to set draggable and droppable elements
    dragdrop($('#humanBody'), $('#checkup'), $('#reportButton'), checking);
  } else { // if they dont an id display alert
    displayAlert();
  }

}

// creat a function to set draggable and droppable effect
function dragdrop(itemdrag, itemdrop, button, newImg) {
  itemdrag.show(); // display the slected img
  itemdrag.draggable(); // make it draggable
  itemdrop.droppable({ //selcted drop img
    drop: function(event, ui) { // drop effect
      button.show(); // display a button that will generate dropping effects
      displayImg(newImg); // display a new img after dropping
      //reset iamges to original style
      itemdrag.removeAttr('style');
      itemdrop.removeAttr('style');

    } // end drop effect
  }); // end droppable

} // end this fucntion

// functions for learning
function learning() {
  if (registered) { //check if they an id
    if (!learnState) { // check if they have already learned

      displayImg(mindImg); // then display images and instrucitons
      textContent = 'Our AI expert is analyzing your IQ...Please be patient';
      $('#explain').text(textContent);
      // generate a random number, range from 70 To 120, as players IQ
      iQ = Math.floor(Math.random() * 50) + 70;

      // wait for analyze
      setTimeout(function() {
        // display buttons and images
        displayButton($('#exitButton'), '59%', '52%');
        $('#explain').text("Your IQ is: " + iQ +
          ". Our result suggests that your are below the average iQ in our society,but here is a way to improve it!" +
          " Drag the chip into your brain, and you will be smart than ever");
        // make the elemnts draggable and droppable
        dragdrop($('#chip'), $('#imgContainer'), $('#startlearn'));

      }, 5000); // function will act in 5s

    } else { // display info if players have already get chipped
      alert('You have finished your learning!');
      $('#backColor').hide();
    }
  } else { // display aler if they dont have id
    displayAlert();
  }
}

// when player click the learning button
function learnEffect() {
  $('#startlearn').hide(); // hide button
  learnState = true; // change state
  iQ = iQ * 2; // get a new IQ after chipped
  displayImg(brainImg); // display a now brain img
  let thisInfo = "Congradulations! Your new IQ is: " + iQ + ". You are as smart as AI now!";
  $('#explain').text(thisInfo);
}

// functions to quit the sections
function quit() {
  $('img').removeAttr('style'); // reset img style
  $('div').removeAttr('style'); // reset any div style
  $('button').removeAttr('style'); // reset button style
  $("#explain").text(""); // reset text to empty
  $("#myInput").hide(); // hide input

}
