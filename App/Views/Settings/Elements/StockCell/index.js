/* @flow */
'use strict';

import React, {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';

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
    let that = this;
    var swipeoutBtns = [{
      text: 'Move up',
      onPress: function() {
        StockActions.moveUpStock(that.props.stock.symbol);
      },
      type: 'secondary',
    }, {
      text: 'Move down',
      onPress: function() {
        StockActions.moveDownStock(that.props.stock.symbol);
      },
      type: 'primary',
    }, {
      text: 'Delete',
      onPress: function() {
        StockActions.deleteStock(that.props.stock.symbol);
      },
      type: 'delete',
    }];

    return (
      <View style={styles.container}>
        <Swipeout
          autoClose={true}
          right={swipeoutBtns} >
          <View style={styles.element}>
            <Icon
              style={styles.delete}
              name="remove-circle"
              color="red"
              size={22}
              onPress={() => this._onPressDeleteButton(this.props.stock.symbol)} />
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
            <Icon style={styles.move} name="menu" color="white" size={22} />
          </View>
        </Swipeout>
        <View style={styles.separator}/>
      </View>
    );

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
