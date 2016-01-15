/* @flow */
'use strict';

import React, {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';

// Flux
import StockActions from '../../../../Utils/Stock/actions';

// Styles
import styles from './style';

var StockCell = React.createClass({
  _onPressAdd: function(symbol: Object) {
    console.log('_onPressAdd', symbol);
    StockActions.addStock(symbol);
    Actions.pop();
  },

  render: function() {
    return (
      <TouchableHighlight onPress={() => this._onPressAdd(this.props.stock.symbol)} underlayColor="#202020">
        <View style={styles.container}>
          <View style={styles.element}>
            <View style={styles.stock}>
              <View style={styles.symbol}>
                <Text style={styles.symbolText}>
                  {this.props.stock.symbol}
                </Text>
                <Text style={styles.marketText}>
                  {this.props.stock.exchDisp}
                </Text>
              </View>
              <View style={styles.name}>
                <Text style={styles.nameText}>
                  {this.props.stock.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = StockCell;
