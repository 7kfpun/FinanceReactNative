/* @flow */
var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'addStock',
  'deleteStock',
  'moveUpStock',
  'moveDownStock',
  'updateStocks',
]);

module.exports = Actions;
