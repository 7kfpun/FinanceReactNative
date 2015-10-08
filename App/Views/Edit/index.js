'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');
var t = require('tcomb-form-native');

var UtilFuncs = require('../../Utils/functions.js');

var {
  Text,
  TouchableHighlight,
  View,
} = React;

var styles = require('./style');

var Form = t.form.Form;

var Person = t.struct({
  symbol: t.Str,
});

var options = {
  auto: 'placeholders',
  fields: {
    symbol: {
    },
  }
};

var EditView = React.createClass({
  getInitialState() {
    return {
      value: {
        symbol: this.props.post,
      }
    };
  },

  componentDidMount: function() {
    var averagePrice, share = 0;
    var that = this;
    store.get('watchlist').then((result) => {
      for (var i=0; i < result.length; i++) {
        if (result[i].symbol === that.props.post) {
          that.setState({
            value: {
              symbol: result[i].symbol,
              averagePrice: result[i].averagePrice,
              share: result[i].share,
            }
          });
        }
      }
    });
  },

  _onPressSaveButton: function () {
    console.log('_onPressSaveButton');
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);

      var that = this;
      store.get('watchlist').then((result) => {
        console.log('pop', result);
        for (var i=0; i < result.length; i++) {
          if (result[i].symbol === that.props.post) {
            result[i].averagePrice = value.averagePrice;
            result[i].share = value.share;
          }
        }
        console.log('done');
        return result;
      }).then((result) => {
        store.save('watchlist', result);
        console.log(result);
        that.props.navigator.pop();
      });
    }
  },

  _onPressDeleteButton: function () {
    console.log('_onPressDeleteButton');
    var value = this.refs.form.getValue();
    if (value) {
      console.log('Delete', value);

      var that = this;
      store.get('watchlist').then((result) => {
        return UtilFuncs.removeObjectfromArray(result, 'symbol', value.symbol);
      }).then((result) => {
        store.save('watchlist', result);
        that.props.navigator.pop();
      });
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Form
          ref='form'
          type={Person}
          value={this.state.value}
          options={options}
        />
        <TouchableHighlight style={styles.button}
		    	underlayColor='#ED6063'
		    	onPress={this._onPressSaveButton}>
		    	<Text style={styles.buttonText}>
		    		Save
		    	</Text>
		  	</TouchableHighlight>
        <TouchableHighlight style={styles.deleteButton}
		    	underlayColor='#ED6063'
		    	onPress={this._onPressDeleteButton}>
		    	<Text style={styles.buttonText}>
		    		Delete
		    	</Text>
		  	</TouchableHighlight>
      </View>
    );
  }
});

module.exports = EditView;
