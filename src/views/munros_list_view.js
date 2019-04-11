const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const MunroListView = function(container) {
  this.container = container;
}

MunroListView.prototype.bindEvents = function() {
  PubSub.subscribe('Munro:Ready', (event) => {
    this.munros = event.detail;
    this.render();
  })
  PubSub.subscribe('Select:region-selected', (event) => {
    const selectedRegion = event.detail;
    this.renderRegion(selectedRegion);
  })
};

MunroListView.prototype.render = function() {
  this.container.innerHTML = '';
  this.munros.forEach((munro) => {
    const munroView = new MunroView(this.container, munro)
    munroView.render();
  });
};

MunroListView.prototype.renderRegion = function(region) {
  this.container.innerHTML = '';
  this.munros.forEach((munro) => {
    if (region === munro.region) {
      const munroView = new MunroView(this.container, munro)
      munroView.render();
    }
  });
};

module.exports = MunroListView;
