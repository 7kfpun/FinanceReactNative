var Reflux = require('reflux');
var Actions = require('./actions');

var Store = Reflux.createStore({
  listenables: Actions,

  onChangeShowingProperty: function(item) {
    console.log('onChangeShowingProperty');
    // this.data.push(item);
    this.trigger(item);
  },

  onAddStock: function() {
    console.log('onAddStock');
    // this.data.push(item);
    // this.trigger(item);
  },

  onDeleteStock: function() {
    console.log('onDeleteStock');
    // this.data.push(item);
    // this.trigger(item);
  },
});

module.exports = Store;
