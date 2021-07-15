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

if (previousFormEntries === null) {
  localStorage.setItem('entry-form', JSON.stringify(data));
}

function keepViewOnUnload() {
  var formDiv = document.querySelector('.form-div');
  var viewBeforeUnload = formDiv.className;
  localStorage.setItem('active-view', viewBeforeUnload);
  return viewBeforeUnload;
}

function retreiveViewOnLoad() {
  var formDiv = document.querySelector('.form-div');
  var viewAfterLoad = localStorage.getItem('active-view');
  formDiv.className = viewAfterLoad;
  return formDiv;
}

window.addEventListener('beforeunload', function (event) {
  var entriesStringified = JSON.stringify(data);
  localStorage.setItem('entry-form', entriesStringified);
  keepViewOnUnload();
});

window.addEventListener('DOMContentLoaded', function (event) {
  retreiveViewOnLoad();
});
