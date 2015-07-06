$(function() {

  // Push all array items into the counter on the homepage

  alert("Javascript is working!"); // Make sure javascript is working

  // Object constructor methods

  function Caption(caption, comment) {
    this.caption = caption;
    this.comment = []; // comments will be passed into this array
  };

  Caption.prototype.addComment = function(comment) {
    this.push(comment);
  };

  // Variables

  var $allCaptions = [
    new Caption("This GIF is completely random."),
  ]; // array to hold all Captions

  function captionCount() {
    var $counter = $("#counter");
    $counter.text($allCaptions.length);
  };

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
   captionCount();
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




  // append comments to an instance of Caption

  var $addACommentForm = $(".add-a-comment");

  var $commentsList = $("#comments-list");

  $addACommentForm.on('submit', function(event) {
    event.preventDefault();

    // push to parent comment comments array

    var $newComment = $("#add-a-comment-text-area").val();

        // store our new todo
    this.addComment($newComment); //"this.addComment is not a function"

    // reset the form
    $addACommentForm.reset();
    $('#add-a-comment').focus();
  });





  // Persistence w/ localStorage
  function Storage(key, initialValue) {
    this._key = key;
    this.save(initialValue);
  }

  Storage.prototype.save = function save(value) {
    localStorage.setItem(this._key, JSON.stringify(value));
  };

  Storage.prototype.get = function get() {
    return JSON.parse(localStorage.getItem(this._key));
  };

  var captionsCollection = $allCaptions.map(function(caption) {
    return caption.caption;
  });

  appStorage = new Storage('captionApp', captionsCollection);
  console.log(appStorage.get());

  // // Tooltip
  // $('#main-image').tooltip('Show');
});
