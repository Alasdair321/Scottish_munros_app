const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function () {
  this.munros = [];
};

Munros.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/munros');
  requestHelper.get((data)=>{
    .then((data) => {
      this.munros = data;
      PubSub.publish('Munro:Ready', this.data);
    })
    .catch((err) => {
      PubSub.publish('Munro:error', err);
    });
  })
};

module.exports = Munros;
