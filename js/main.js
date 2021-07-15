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
  var insert = document.querySelector('ul');

  insert.prepend(retrieveEntry(submitForm.elements[0].value, submitForm.elements[1].value, submitForm.elements[2].value));

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
  var formDiv = document.querySelector('.form-div');
  formDiv.className = 'form-div hidden';

  var entriesDiv = document.querySelector('.entries-div');
  entriesDiv.className = 'entries-div ';

}

submitForm.addEventListener('submit', submitEntry);

function retrieveEntry(title, photoUrl, notes) {
  var entryLi = document.createElement('li');

  var entryRow = document.createElement('div');
  entryRow.className = 'row';
  var entryColHalfImg = document.createElement('div');
  entryColHalfImg.className = 'column-half';
  var entryImg = document.createElement('img');
  entryImg.className = 'placeholder-img rounded form-item-div';
  entryImg.setAttribute('src', photoUrl);
  entryImg.setAttribute('alt', 'placeholder');

  var entryColHalfText = document.createElement('div');
  entryColHalfText.className = 'column-half';
  var entryMargin = document.createElement('div');
  entryMargin.className = 'form-item-div input-bottom-margin';
  var entryH2 = document.createElement('h2');
  entryH2.textContent = title;
  var entryText1 = document.createElement('p');
  entryText1.textContent = notes;

  entryLi.appendChild(entryRow);
  entryRow.appendChild(entryColHalfImg);
  entryColHalfImg.appendChild(entryImg);

  entryRow.appendChild(entryColHalfText);
  entryColHalfText.appendChild(entryMargin);
  entryMargin.appendChild(entryH2);
  entryMargin.appendChild(entryText1);

  return entryLi;
}

window.addEventListener('DOMContentLoaded', function (event) {
  var insert = document.querySelector('ul');

  for (var i = 0; i < data.entries.length; i++) {
    insert.appendChild(retrieveEntry(data.entries[i].title, data.entries[i].photoUrl, data.entries[i].notes));
  }

});

var newEntryButton = document.querySelector('.new-button');

function showNewEntryForm() {
  var formDiv = document.querySelector('.form-div');
  formDiv.className = 'form-div ';

  var entriesDiv = document.querySelector('.entries-div');
  entriesDiv.className = 'entries-div hidden';
}
newEntryButton.addEventListener('click', showNewEntryForm);
