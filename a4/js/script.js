/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

*/

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);
});


// refresh the page while clicking on the page
$(document).click(function() {
    location.reload(true);
  });
// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  let noun =  'scent'
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
    noun='scents';
  }

  // Now the cat
  let cat = getRandomElement(data.cats);

  // chech the correct article
  let article='a';
  if (cat.charAt(0) === 'A' || cat.charAt(0) === 'E' || cat.charAt(0) === 'I' || cat.charAt(0) === 'O'|| cat.charAt(0) === 'U') {
    article = 'an';
  }
  else{article='a'};

  // Same again for room
  let room = getRandomElement(data.rooms);

  // added elements
  let fruit=getRandomElement(data.fruits);
  let name=getRandomElement(data.names);
  let spice=getRandomElement(data.spices);

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  // try to make the sentence meaningful
  let description = `${name} once said that the ${noun} of ${condiment} ${verb} like ${article} ${cat} eating ${fruit} with ${spice} in the ${room}.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)
}

// dataError()
//
// Called if the JSON does not load for some reason.
// Reports the error to the console.
function dataError(request, text, error) {
  console.error(error);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
