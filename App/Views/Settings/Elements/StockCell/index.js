'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

// Utils
var UtilFuncs = require('../../../../Utils/functions');

// Styles
var styles = require('./style');

var StockCell = React.createClass({
  getInitialState: function() {
    return {};
  },

  _onPressDeleteButton: function(symbol) {
    console.log('_onPressDeleteButton', symbol);
    store.get('watchlist').then((result) => {
      return UtilFuncs.removeObjectfromArray(result, 'symbol', symbol);
    }).then((result) => {
      store.save('watchlist', result);

      this.props.onRefreshSettingsView();
    });
  },

  render: function() {
    console.log(this.props.stock);
    return (
      <View style={styles.container}>
        <View style={styles.stockElement}>
          <TouchableOpacity style={styles.stockDelete}
              onPress={() => this._onPressDeleteButton(this.props.stock.symbol)}>
            <Text style={styles.stockDeleteText}>
              ㊀
            </Text>
          </TouchableOpacity>
          <View style={styles.stockSymbol}>
            <Text style={styles.stockSymbolText}>
              {this.props.stock.symbol}
            </Text>
            <Text style={styles.stockSymbolText}>
              Hong Kong
            </Text>
          </View>
          <View style={styles.stockMove}>
            <Text style={styles.stockMoveText}>
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
