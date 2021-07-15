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

var previousView = localStorage.getItem('active-view');

if (previousView === null) {
  localStorage.setItem('active-view', 'entries-div');
}

function keepViewOnUnload() {
  var formDiv = document.querySelector('.form-div');
  var entriesDiv = document.querySelector('.entries-div');
  var viewBeforeUnload;
  if (formDiv.className.includes('hidden')) {
    viewBeforeUnload = 'entries-div';
  } else if (entriesDiv.className.includes('hidden')) {
    viewBeforeUnload = 'form-div';
  }

  localStorage.setItem('active-view', viewBeforeUnload);

  return viewBeforeUnload;
}

function retreiveViewOnLoad() {

  var viewAfterLoad = localStorage.getItem('active-view');
  var activeView;
  var inactiveView1;
  if (viewAfterLoad === 'entries-div') {
    activeView = document.querySelector('.entries-div');
    activeView.className = 'entries-div';
    inactiveView1 = document.querySelector('.form-div');
    inactiveView1.className = 'form-div hidden';
  } else if (viewAfterLoad === 'form-div') {
    activeView = document.querySelector('.form-div');
    activeView.className = 'form-div';
    inactiveView1 = document.querySelector('.entries-div');
    inactiveView1.className = 'entries-div hidden';
  }

}

window.addEventListener('beforeunload', function (event) {
  var entriesStringified = JSON.stringify(data);
  localStorage.setItem('entry-form', entriesStringified);
  keepViewOnUnload();
});

window.addEventListener('DOMContentLoaded', function (event) {
  retreiveViewOnLoad();
});
