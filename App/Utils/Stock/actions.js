var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'addStock',
  'deleteStock',
  'updateStocks',
]);

module.exports = Actions;
