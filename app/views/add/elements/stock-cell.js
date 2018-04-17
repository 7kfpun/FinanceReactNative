import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';

// Flux
import StockActions from '../../../actions/stock-action';

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

export default class StockCell extends React.Component {
  onPressAdd(symbol) {
    console.log('_onPressAdd', symbol);
    StockActions.addStock(symbol);
    Actions.pop();
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.onPressAdd(this.props.stock.symbol)} underlayColor="#202020">
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

StockCell.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string,
    exchDisp: PropTypes.string,
    name: PropTypes.string,
  }),
};

StockCell.defaultProps = {
  stock: {},
};
