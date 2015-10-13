'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

// Styles
var styles = require('./style');
var Swipeout = require('react-native-swipeout')

var that;

// Buttons
var swipeoutBtns = [
  {
    backgroundColor: 'red',
    text: 'Delete',
    onPress: function () {
      console.log('click delete', that.state.selectedStock);
      var selectedStock = that.state.selectedStock;
      store.get('watchlist').then((result) => {
        console.log(result);
        return UtilFuncs.removeObjectfromArray(result, 'symbol', selectedStock);
      }).then((result) => {
        console.log('After deleted', result);
        store.save('watchlist', result);
      });
    },
  }
]

var StockCell = React.createClass({
  getInitialState: function() {
    return {};
  },

  _handleSwipeout: function(symbol) {
    console.log('_handleSwipeout delete symbol', symbol);
    this.setState({
      selectedStock: symbol,
    });
  },

  render: function(rowData: string, sectionID: number, rowID: number) {
    console.log(this.props.stock);
    // <View style={styles.stockDelete}>
    //   <Text style={styles.stockDeleteText}>
    //     ㊀
    //   </Text>
    // </View>
    that = this;
    return (
      <View style={styles.container}>
        <View style={styles.stockSymbol}>
          <Swipeout
              right={swipeoutBtns}
              onOpen={(symbol) => this._handleSwipeout(this.props.stock.symbol)}
              backgroundColor='black'>
            <View>
              <Text style={styles.stockSymbolText}>
                {this.props.stock.symbol}
              </Text>
            </View>
          </Swipeout>
          <View style={styles.separator}/>
        </View>
      </View>
    );

    return (
      <TouchableHighlight underlayColor='#4D4D4D'>
        <View style={styles.container}>
          <View style={styles.stockContainer}>
            <View style={styles.stockSymbol}>
              <Text style={styles.stockSymbolText}>
                {this.props.stock.symbol}
              </Text>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>
                {this.props.stock.LastTradePriceOnly}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StockCell;
