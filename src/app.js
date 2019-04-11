const MunroListView = require('./views/munros_list_view.js');
const Munro = require('./models/munros.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const container = document.querySelector('#munros-container');
  const munroListView = new MunroListView(container);
  munroListView.bindEvents();

  const munros = new Munro();
  munros.getData();

});
