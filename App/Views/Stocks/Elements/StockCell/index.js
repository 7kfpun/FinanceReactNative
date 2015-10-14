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

var StockCell = React.createClass({
  getInitialState: function() {
    return {
      showingProperty: 'Change',
    };
  },

  componentDidMount: function() {
    store.get('showingProperty').then((result) => {
      if (!result) {
        result = 'Change';
        store.save('showingProperty', result);
      }
      this.setState({
        showingProperty: result,
      });
    });
  },

  getShowingProperty: function () {
    store.get('showingProperty').then((result) => {
      return result;
    });
  },

  changeShowingProperty: function() {
    store.get('showingProperty').then((result) => {
      if (result === 'Change') {
        store.save('showingProperty', 'ChangeinPercent');
      } else if (result === 'ChangeinPercent') {
        store.save('showingProperty', 'MarketCapitalization');
      } else if (result === 'MarketCapitalization') {
        store.save('showingProperty', 'Change');
      }
      this.setState({
        showingProperty: result,
      });
      this.props.onRefreshStocksView();
    });
  },

  render: function() {
    console.log(this.props.stock);
    return (
      <TouchableHighlight onPress={this.props.onSelect} underlayColor='#202020'>
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
            <TouchableOpacity style={(() => {
              switch (this.props.stock.Change && this.props.stock.Change.startsWith('+')) {
                case true:                   return styles.stockChangeGreen;
                case false:                  return styles.stockChangeRed;
                default:                     return styles.stockChangeGreen;
              }
            })()} onPress={this.changeShowingProperty}>
              <View>
                <Text style={styles.stockChangeText}>
                  {(() => {
                    switch (this.state.showingProperty) {
                      case 'Change':                 return this.props.stock.Change || '--';
                      case 'ChangeinPercent':        return this.props.stock.ChangeinPercent || '--';
                      case 'MarketCapitalization':   return this.props.stock.MarketCapitalization || '--';
                      default:                       return this.props.stock.Change || '--';
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
