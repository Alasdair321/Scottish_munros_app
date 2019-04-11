const MunroListView = require('./views/munros_list_view.js');
const Munro = require('./models/munros.js');
const MunroSelectView = require('./views/munro_select_view.js')


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const container = document.querySelector('#munros-container');
  const munroListView = new MunroListView(container);
  munroListView.bindEvents();

  const dropDown = document.querySelector('#munro-regions');
  munroSelectView = new MunroSelectView(dropDown);
  munroSelectView.bindEvents();

  const munros = new Munro();
  munros.getData();

});
