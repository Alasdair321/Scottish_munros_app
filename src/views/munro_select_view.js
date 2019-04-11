const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const MunroSelector = function (dropDown) {
  this.dropDown = dropDown;
}

MunroSelector.prototype.bindEvents = function () {
  PubSub.subscribe('Munro:ReadyforDropdown', (event) => {
    // this.munros = event.detail;
    console.log(event.detail);
    // this.render();
  })
};

MunroSelector.prototype.render = function () {
  // for each unique region add option to select


};

module.exports = MunroSelector;
