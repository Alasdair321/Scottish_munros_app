const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const MunroSelector = function (dropDown) {
  this.dropDown = dropDown;
}

MunroSelector.prototype.bindEvents = function () {
  PubSub.subscribe('Munro:ReadyforDropdown', (event) => {
    // this.munros = event.detail;
    // console.log(event.detail);
    this.render(event.detail);
  })
  this.dropDown.addEventListener('change', (event)=>{
    const selected = event.target.value;
    PubSub.publish('Select:region-selected', selected);
  })

};

MunroSelector.prototype.render = function (options) {
  options.forEach((option, index)=>{
    const selectOption = document.createElement('option');
    selectOption.textContent = option;
    selectOption.value = option;
    this.dropDown.appendChild(selectOption);
  })
};

module.exports = MunroSelector;
