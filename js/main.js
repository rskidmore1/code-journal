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
    title: submitForm.elements[0].value,
    photoUrl: submitForm.elements[1].value,
    notes: submitForm.elements[2].value,
    entryId: data.nextEntryId
  };

  data.entries.unshift(formEntry);
  data.nextEntryId += 1;

  imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

  submitForm.reset();

}

submitForm.addEventListener('submit', submitEntry);
