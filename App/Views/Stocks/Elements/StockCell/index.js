'use strict';

var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

// Styles
var styles = require("./style");

var StockCell = React.createClass({
  getInitialState: function() {
    return {
      showingProperty: 'Change',
    };
  },

  changeShowingProperty: function() {
    if (this.state.showingProperty === 'Change') {
      this.setState({
        showingProperty: 'ChangeinPercent',
      });
    } else if (this.state.showingProperty === 'ChangeinPercent') {
      this.setState({
        showingProperty: 'AverageDailyVolume',
      });
    } else if (this.state.showingProperty === 'AverageDailyVolume') {
      this.setState({
        showingProperty: 'Change',
      });
    }
  },

  render: function() {
    console.log(this.props.stock);
    return (
      <TouchableHighlight onPress={this.props.onSelect} underlayColor="#4D4D4D">
        <View style={styles.container}>
          <View style={styles.stockContainer}>
            <View style={styles.stockSymbol}>
              <Text style={styles.stockSymbolText}>
                {this.props.stock.Symbol}
              </Text>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>
                {this.props.stock.LastTradePriceOnly}
              </Text>
            </View>
            <TouchableOpacity style={styles.stockChange} onPress={this.changeShowingProperty}>
              <View>
                <Text style={styles.stockChangeText}>
                  {(() => {
                    switch (this.state.showingProperty) {
                      case "Change":               return this.props.stock.Change;
                      case "ChangeinPercent":      return this.props.stock.ChangeinPercent;
                      case "AverageDailyVolume":   return this.props.stock.AverageDailyVolume;
                      default:                     return this.props.stock.Change;
                    }
                  })()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StockCell;
