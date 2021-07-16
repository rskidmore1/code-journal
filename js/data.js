
/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousFormEntries = localStorage.getItem('entry-form');

if (previousFormEntries !== null) {
  data = JSON.parse(previousFormEntries);
}

window.addEventListener('beforeunload', function (event) {
  var entriesStringified = JSON.stringify(data);
  localStorage.setItem('entry-form', entriesStringified);
});

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
    // // console.log('event worked', event.target);
    var closestItem = event.target.closest('li');

    data.view = 'entry-form';
    switchView(data.view);
    var dataViewId = closestItem.getAttribute('data-entry-id');
    // console.log(closestItem);
    // console.log('dataViewId: ', dataViewId);
    for (var i = 0; i < data.entries.length; i++) {
      // // console.log(data.entries[i]);
      if (data.entries[i].entryId === Number(dataViewId)) {
        // console.log('if loop worked: ', data.entries[i]);
        data.editing = data.entries[i];
        setEditInput(data.editing);
      }
    }

    // data.editing = 'hello'; data.editing =

  }

});
