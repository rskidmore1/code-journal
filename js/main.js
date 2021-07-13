/* global data */
/* exported data */

var urlInput = document.querySelector('.photoUrl');
var imgSrc = document.querySelector('.placeholder-img');
urlInput.addEventListener('input', function (event) {

  var imgUrl = event.target.value;
  imgSrc.setAttribute('src', imgUrl);

});

var submitButton = document.getElementById('codeform');
var entriesParsed = {};
var previousFormEntries = localStorage.getItem('entry-form');

if (previousFormEntries !== null) {
  entriesParsed = JSON.parse(previousFormEntries);
}

if (previousFormEntries === null) {
  localStorage.setItem('entry-form', JSON.stringify(data));
}

submitButton.addEventListener('submit', function (event) {
  var formEntry = {
    title: event.target.querySelector('#title').value,
    photoUrl: event.target.querySelector('#photo-url').value,
    notes: event.target.querySelector('#notes').value
  };

  entriesParsed.entries.push(formEntry);
  entriesParsed.nextEntryId += 1;

  var entriesStringified = JSON.stringify(entriesParsed);

  localStorage.setItem('entry-form', entriesStringified);

  imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

  submitButton.reset();
  event.preventDefault();

});
