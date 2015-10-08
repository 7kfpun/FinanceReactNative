'use strict';

var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  View,
} = React;

// Styles
var styles = require("./style");

var StockCell = React.createClass({
  render: function() {
    console.log(this.props.stock);
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.stockCount}>
            {this.props.stock.symbol}
          </Text>
          <View style={styles.stockDetailsContainer}>
            <Text style={styles.stockTitle}>
              {this.props.stock.Name} {this.props.stock.LastTradePriceOnly} {this.props.stock.Currency}
            </Text>
            <Text style={styles.stockDetailsLine}>
              {this.props.stock.Change} | {this.props.stock.ChangeinPercent} | {this.props.stock.MarketCapitalization}
            </Text>
            <View style={styles.separator}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StockCell;
