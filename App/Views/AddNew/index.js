'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');
var t = require('tcomb-form-native');

var UtilFuncs = require('../../Utils/functions.js');

var {
  Text,
  TouchableHighlight,
  View,
  TextInput,
} = React;

// Flux
var StockActions = require('../../Utils/Stock/actions');

var styles = require('./style');

var Form = t.form.Form;

var Person = t.struct({
  symbol: t.Str,
});

var options = {
  auto: 'placeholders',

  fields: {
    symbol: {
      autoFocus: true,
      placeholderTextColor: 'white',
    },
  }
};

var AddNewView = React.createClass({
  getInitialState() {
    return {};
  },

  _onPressSaveButton: function () {
    console.log('_onPressSaveButton');
    var value = this.refs.form.getValue();
    if (value) {
      console.log('New added', value);

      var that = this;
      var result;
      store.get('watchlist').then((result) => {

        var symbols = [];
        for (var i=0; i < result.length; i++) {
          symbols.push(result[i].symbol.toUpperCase());
        }

        if (symbols.indexOf(value.symbol.toUpperCase()) === -1) {
          result.push({symbol: value.symbol.toUpperCase(), share: 100});
          result.sort(UtilFuncs.dynamicSort('symbol'));
          store.save('watchlist', result);
          StockActions.updateStocks();
          console.log('Add stock', result, value);
        }
      });

      this.props.navigator.pop();
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>
          Type a stock symbol.
        </Text>
        <View style={styles.searchBar}>
          <Form
            ref='form'
            type={Person}
            options={options}
          />
        </View>
        <TouchableHighlight style={styles.button}
		    	underlayColor='#66C2FF'
		    	onPress={this._onPressSaveButton}>
		    	<Text style={styles.buttonText}>
		    		Add
		    	</Text>
		  	</TouchableHighlight>
      </View>
    );
  }
});

module.exports = AddNewView;
