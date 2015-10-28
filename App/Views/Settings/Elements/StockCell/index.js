/* @flow */
'use strict';

var React = require('react-native');

var {
  Image,
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
  _onPressDeleteButton: function(symbol: Object) {
    console.log('_onPressDeleteButton', symbol);
    StockActions.deleteStock(symbol);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.element}>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => this._onPressDeleteButton(this.props.stock.symbol)}>
            <Image style={styles.icon} source={require('image!ic_remove_red')} />
          </TouchableOpacity>
          <View style={styles.stock}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.stock.symbol}
              </Text>
              <Text style={styles.marketText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].StockExchange}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Name}
              </Text>
            </View>
          </View>
          <View style={styles.move}>
            <Image style={styles.icon} source={require('image!ic_three_lines_white')} />
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
});

module.exports = StockCell;
