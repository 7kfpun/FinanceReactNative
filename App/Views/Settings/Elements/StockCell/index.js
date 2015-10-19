'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

// Flux
var StockActions = require('../../../../Utils/Stock/actions');

// Styles
var styles = require('./style');

var StockCell = React.createClass({
  _onPressDeleteButton: function(symbol) {
    console.log('_onPressDeleteButton', symbol);
    StockActions.deleteStock(symbol);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.element}>
          <TouchableOpacity style={styles.delete}
              onPress={() => this._onPressDeleteButton(this.props.stock.symbol)}>
            <Text style={styles.deleteText}>
              ㊀
            </Text>
          </TouchableOpacity>
          <View style={styles.stock}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.stock.symbol}
              </Text>
              <Text style={styles.marketText}>
                {this.props.watchlistCache && this.props.watchlistCache[this.props.stock.symbol] && this.props.watchlistCache[this.props.stock.symbol].StockExchange}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameText}>
                {this.props.watchlistCache && this.props.watchlistCache[this.props.stock.symbol] && this.props.watchlistCache[this.props.stock.symbol].Name}
              </Text>
            </View>
          </View>
          <View style={styles.move}>
            <Text style={styles.moveText}>
              ☰
            </Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
});

module.exports = StockCell;
