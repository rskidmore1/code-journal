
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
