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
    })
    .catch( (err) => {
      PubSub.publish('Munro:error', err);
    });
  };

module.exports = Munros;
