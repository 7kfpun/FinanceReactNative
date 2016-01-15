/* @flow */
'use strict';

import React, {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Flux
import StockActions from '../../../../Utils/Stock/actions';

// Styles
import styles from './style';

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
            <Icon name="remove-circle" color="red" size={22} />
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
            <Icon name="menu" color="white" size={22} />
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
});

module.exports = StockCell;
