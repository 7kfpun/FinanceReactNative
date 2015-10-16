var Reflux = require('reflux');

// Flux
var Actions = require('./actions');

var Store = Reflux.createStore({
  listenables: Actions,

  onUpdateStocks: function() {
    console.log('onUpdateStocks');
    this.trigger();
  },
});

module.exports = Store;
