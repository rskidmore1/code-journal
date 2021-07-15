
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

});
