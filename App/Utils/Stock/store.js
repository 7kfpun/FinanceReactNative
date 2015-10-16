var Reflux = require('reflux');
var Actions = require('./actions');

var Store = Reflux.createStore({
  listenables: Actions,

  onUpdateStocks: function() {
    console.log('onUpdateStocks');
    // this.data.push(item);
    this.trigger();
  },
});

module.exports = Store;
