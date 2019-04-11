const MunroView = function(container, munro) {
this.container = container;
this.munro = munro;
};

MunroView.prototype.render = function () {
  const munroContainer = document.createElement('div');
  munroContainer.classList.add('mountain');

  const heading = document.createElement('h1');
  heading.classList.add('munro-name');
  heading.textContent = `Munro: ${this.munro.name}`
  this.container.appendChild(munroContainer);
  munroContainer.appendChild(heading);
};

module.exports = MunroView;
