$(function() {

  alert("Javascript is working!");

  // Object constructor methods

  function Caption(caption) {
    this.caption = caption;
  };

  // Variables

  var $allCaptions = [
    new Caption("This GIF is completely random."),
    new Caption("Who posted this?!?")
  ]; // array to hold all Captions

  var $navbarForm = $(".navbar-form");

  var $captionForm = $(".form-to-submit-new-caption");

  var $newCaption = $("#text-area");

  // todo template
  var template = _.template($("#captions-suggestion-template").html());

  var $divToHoldCaptions = $("#row-templating-script-will-be-input-here");

  Caption.prototype.save = function() { //add save function to the Caption prototype
    // store our new todo
    $allCaptions.push(this);
  };

  //add render function to the Caption prototype
  Caption.prototype.render = function () {
    // append our new todo to the page
   var $caption = $(template(this));
   this.index = $allCaptions.indexOf(this);
   $caption.attr('data-index', this.index);
   $divToHoldCaptions.append($caption);
   console.log("Render works")
  };

  // Submit form

  $captionForm.on('submit', function(event) { // there is nothing wrong with this function
  event.preventDefault();

  // Creating new caption object from form data
  var newCaption = $newCaption.val(); //this is the value of the data from the text area
  var newCaptionObject = new Caption(newCaption); // calling constructor function

  console.log(newCaptionObject)

  // save newCaptionObject to allCaptions array
  newCaptionObject.save();

  console.log($allCaptions);

  // Render allCaptions to the page
  newCaptionObject.render();

  // Reset the input form
  $captionForm[0].reset();
  $('#text-area').focus();
  });

  // append existing captions (from seed data) to allCaptions
  // `_.each` is an "iterator" function provided by Underscore.js
  // all elemenets the each iterator uses must be defined aboeve the each iterator for it to work
  _.each($allCaptions, function (caption, index) {
    caption.render();
  });

  // Push items into an array, then render them to the page from there

  // _.each(pets, function (pet, index) {
  // var $pet = $(petsTemplate(pet));
  // $pet.attr('data-index', index);
  // $petsList.append($pet);
  // });

  //navbar form will render user's name in the

  // create user object
  // create suggestion object
  // create comment object

  // User has many suggestions
  // Suggestions can have many comments

  // Username should be rendered to the page

});
