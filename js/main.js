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

// var previousFormEntries = localStorage.getItem('entry-form');
// console.log('entry-form: ', JSON.stringify(previousFormEntries[0]));

var previousFormEntries = localStorage.getItem('entry-form');

// localStorage.setItem('entry-form', JSON.stringify(data));

// var entriesParsed = JSON.parse(previousFormEntries);
// console.log('retrieved entry: ', entriesParsed.entries);

// console.log('type of entriesParsed: ', typeof entriesParsed);

if (previousFormEntries !== null) { // Checks if there is anything in this
  entriesParsed = JSON.parse(previousFormEntries); //
}

if (previousFormEntries === null) {
  localStorage.setItem('entry-form', JSON.stringify(data));

}

// console.log('previousFormEntries: ', previousFormEntries);

submitButton.addEventListener('submit', function (event) {

  // console.log('event: ', event.target);
  // console.log('finding event items: ', event.target.querySelector('#title').value);
  // console.log('finding event items: ', event.target.querySelector('#photo-url').value);
  // console.log('finding event items: ', event.target.querySelector('#notes').value);

  var formEntry = {
    title: event.target.querySelector('#title').value,
    photoUrl: event.target.querySelector('#photo-url').value,
    notes: event.target.querySelector('#notes').value

  };
  // console.log('form entry: ', formEntry);

  entriesParsed.entries.push(formEntry);
  entriesParsed.nextEntryId += 1;

  var entriesStringified = JSON.stringify(entriesParsed);

  localStorage.setItem('entry-form', entriesStringified);

  // console.log('new entries from funcitn: ', entriesParsed);

  // console.log('data: ', data);

  // data.nextEntryId += 1;

  imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

  submitButton.reset();
  event.preventDefault();

});
