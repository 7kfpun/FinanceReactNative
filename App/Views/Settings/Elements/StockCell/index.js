'use strict';

var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

// Styles
var styles = require('./style');
var Swipeout = require('react-native-swipeout')

// Buttons
var swipeoutBtns = [
  {
    backgroundColor: 'red',
    text: 'Delete',
    onPress: function (d) {
      console.log('click delete', d);
    },
  }
]

var StockCell = React.createClass({
  getInitialState: function() {
    return {};
  },

  _handleSwipeout: function(sectionID, rowID) {
    console.log('sectionID', sectionID, 'rowID', rowID);
  },

  render: function() {
    console.log(this.props.stock);
    // <View style={styles.stockDelete}>
    //   <Text style={styles.stockDeleteText}>
    //     ㊀
    //   </Text>
    // </View>
    return (
      <View style={styles.container}>
        <View style={styles.stockSymbol}>
          <Swipeout
              right={swipeoutBtns}
              onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}
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
