const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function () {
  this.munros = [];
};



Munros.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/munros');
  requestHelper.get()
    .then( (data) => {
      this.munros = data;
      console.log(this.munros);
      PubSub.publish('Munro:Ready', this.munros);
      const regions = this.regions();
      PubSub.publish('Munro:ReadyforDropdown', regions);
    })
    .catch( (err) => {
      PubSub.publish('Munro:error', err);
    });
  };

Munros.prototype.regions = function () {
  return this.munros.map( munro => munro.region)
  .filter((region, index, regions) => regions.indexOf(region) === index);
};

module.exports = Munros;
