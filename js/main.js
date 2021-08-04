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

  if (Number(submitForm.elements[0].getAttribute('entry-id')) > 0) {
    var existingLIs = insert.querySelectorAll('li');
    for (var i = 0; i < existingLIs.length; i++) {
      if (existingLIs[i].getAttribute('data-entry-id') === submitForm.elements[0].getAttribute('entry-id')) {
        existingLIs[i].querySelector('img').setAttribute('src', submitForm.elements[1].value);
        existingLIs[i].querySelector('h2').textContent = submitForm.elements[0].value;
        existingLIs[i].querySelector('p').textContent = submitForm.elements[2].value;
        data.editing = null;

        submitForm.elements[0].setAttribute('entry-id', '');
        submitForm.elements[0].setAttribute('value', '');
        submitForm.elements[1].setAttribute('value', '');
        submitForm.elements[2].textContent = '';

      }
    }
  } else {
    insert.prepend(retrieveEntry(submitForm.elements[0].value, submitForm.elements[1].value, submitForm.elements[2].value));

  }

  event.preventDefault();

  var entryId = document.querySelector('#title').getAttribute('entry-id');

  if (entryId !== '') {

    for (var j = 0; j < data.entries.length; j++) {
      if (Number(entryId) === data.entries[i].entryId) {

        data.entries[j].title = submitForm.elements[0].value;
        data.entries[j].photoUrl = submitForm.elements[1].value;
        data.entries[j].notes = submitForm.elements[2].value;

      }
    }
  } else {

    var formEntry = {
      title: submitForm.elements[0].value,
      photoUrl: submitForm.elements[1].value,
      notes: submitForm.elements[2].value,
      entryId: data.nextEntryId
    };

    data.entries.unshift(formEntry);
    data.nextEntryId += 1;

  }
  data.editing = null;
  data.view = 'entries';

  imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

  submitForm.reset();
  var resetEntryId = document.querySelector('#title');
  resetEntryId.setAttribute('entry-id', '');
  var formDiv = document.querySelector('.form-div');
  formDiv.className = 'form-div hidden';

  var entriesDiv = document.querySelector('.entries-div');
  entriesDiv.className = 'entries-div ';

}

submitForm.addEventListener('submit', submitEntry);

function retrieveEntry(title, photoUrl, notes, entryId) {
  // // console.log('entryId:', entryId);
  var entryLi = document.createElement('li');
  entryLi.setAttribute('data-entry-id', entryId);

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
  var textIconRow = document.createElement('div');
  textIconRow.className = 'row';

  var entryH2 = document.createElement('h2');
  entryH2.className = 'column-half edit-item';
  entryH2.textContent = title;
  var penIcon = document.createElement('i');
  penIcon.className = 'column-half edit-item edit-pen fas fa-pen';
  var entryText1 = document.createElement('p');
  entryText1.textContent = notes;

  entryLi.appendChild(entryRow);
  entryRow.appendChild(entryColHalfImg);
  entryColHalfImg.appendChild(entryImg);

  entryRow.appendChild(entryColHalfText);
  entryColHalfText.appendChild(entryMargin);
  entryMargin.appendChild(textIconRow);
  textIconRow.appendChild(entryH2);
  textIconRow.appendChild(penIcon);

  entryMargin.appendChild(entryText1);

  return entryLi;
}

window.addEventListener('DOMContentLoaded', function (event) {
  var insert = document.querySelector('ul');

  for (var i = 0; i < data.entries.length; i++) {
    insert.appendChild(retrieveEntry(data.entries[i].title, data.entries[i].photoUrl, data.entries[i].notes, data.entries[i].entryId));
  }

});

var newEntryButton = document.querySelector('.new-button');

function showNewEntryForm() {

  var formDiv = document.querySelector('.form-div');

  formDiv.className = 'form-div ';
  data.view = formDiv.getAttribute('data-view');

  var entriesDiv = document.querySelector('.entries-div');
  entriesDiv.className = 'entries-div hidden';

}
newEntryButton.addEventListener('click', showNewEntryForm);

function switchView(view) {
  var dataViewList = document.querySelectorAll('div[data-view]');
  for (var i = 0; i < dataViewList.length; i++) {
    if (dataViewList[i].getAttribute('data-view') !== view) {
      dataViewList[i].classList.add('hidden');
    } else if (dataViewList[i].getAttribute('data-view') === view) {
      dataViewList[i].classList.remove('hidden');
    }
  }
  data.view = view;

}

window.addEventListener('DOMContentLoaded', function (event) {

  switchView(data.view);

  if (data.editing !== null) {
    setEditInput(data.editing);
    var showDelText = document.querySelector('.delete-text');
    showDelText.classList.remove('hidden');
  }

});

function setEditInput(edit) {

  document.querySelector('#photo-url').setAttribute('value', edit.photoUrl);

  document.querySelector('#title').setAttribute('value', edit.title);
  document.querySelector('#title').setAttribute('entry-id', edit.entryId);
  document.querySelector('#notes').textContent = edit.notes;
}

var ulItem = document.querySelector('.entries-list');
ulItem.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    // // // console.log('event worked', event.target);
    var closestItem = event.target.closest('li');

    data.view = 'entry-form';
    switchView(data.view);
    var showDelText = document.querySelector('.delete-text');
    showDelText.classList.remove('hidden');
    var dataViewId = closestItem.getAttribute('data-entry-id');
    // // console.log(closestItem);
    // // console.log('dataViewId: ', dataViewId);
    for (var i = 0; i < data.entries.length; i++) {
      // // // console.log(data.entries[i]);
      if (data.entries[i].entryId === Number(dataViewId)) {
        // console.log('if loop worked: ', data.entries[i]);
        data.editing = data.entries[i];
        setEditInput(data.editing);
      }
    }
  }

});

function showModal(event) {
  var overlay = document.querySelector('.overlay');
  overlay.className = 'overlay';
}

var deleteText = document.querySelector('.delete-text');
deleteText.addEventListener('click', showModal);

function cancelModal(event) {
  var overlay = document.querySelector('.overlay');
  overlay.className = 'overlay hidden';
}

var cancelBtn = document.querySelector('.cancel-button');
cancelBtn.addEventListener('click', cancelModal);

var confirmBtn = document.querySelector('.confirm-button');
confirmBtn.addEventListener('click', function () {
  var hideDelText = document.querySelector('.delete-text');
  hideDelText.classList.add('hidden');
  var entryId = document.querySelector('#title').getAttribute('entry-id');
  // console.log(entryId);
  var idQuery = "[data-entry-id='" + entryId + "']";
  var removeLi = document.querySelector(idQuery);
  // console.log(removeLi);
  removeLi.remove();
  data.view = 'entries';
  switchView(data.view);
  cancelModal('la');
  // debugger;
  submitForm.reset();
  var resetEntryId = document.querySelector('#title');
  resetEntryId.setAttribute('entry-id', '');
  for (var i = 0; i < data.entries.length; i++) {
    // console.log(data.entries[i].entryId);
    // var someVal = data.entries[i].entryId;

    if (data.entries[i].entryId === Number(entryId)) {
      data.editing = null;
      // // console.log('if loop worked: ', data.entries[i]);
      // data.editing = data.entries[i];
      data.entries.splice(i, 1);
      // setEditInput(data.editing);
      break;
    }
  }
  // // console.log(data.entries);

  // var
});
