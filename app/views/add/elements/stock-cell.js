import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// Flux
import StockActions from '../../../actions/stock-action';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';

export default class StockCell extends React.Component {
  _onPressAdd(symbol) {
    console.log('_onPressAdd', symbol);
    StockActions.addStock(symbol);
    Actions.pop();
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this._onPressAdd(this.props.stock.symbol)} underlayColor="#202020">
        <View style={styles.container}>
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
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stock: {
    flex: 8,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
});
