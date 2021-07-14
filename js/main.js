/* global data */
/* exported data */

var urlInput = document.querySelector('.photoUrl');
var imgSrc = document.querySelector('.placeholder-img');
urlInput.addEventListener('input', function (event) {

  var imgUrl = event.target.value;
  imgSrc.setAttribute('src', imgUrl);

});

var submitForm = document.getElementById('codeform');

function submitEntry(event) {

  event.preventDefault();

  var formEntry = {
    title: event.target[0].value,
    photoUrl: event.target[1].value,
    notes: event.target[2].value
  };

  data.entries.unshift(formEntry);
  data.nextEntryId += 1;

  imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

  submitForm.reset();

}

submitForm.addEventListener('submit', submitEntry);

window.addEventListener('beforeunload', function (event) {
  var entriesStringified = JSON.stringify(data);

  localStorage.setItem('entry-form', entriesStringified);
});
