var Reflux = require('reflux');
var Actions = require('./actions');

var Store = Reflux.createStore({
  listenables: Actions,

  onChangeShowingProperty: function(item) {
    console.log('onChangeShowingProperty');
    // this.data.push(item);
    this.trigger(item);
  },
});

module.exports = Store;
