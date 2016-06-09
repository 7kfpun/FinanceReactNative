import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

// Flux
import StockActions from '../../../actions/stock-action';
import StockStore from '../../../stores/stock-store';

const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

export default class StockCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = StockStore.getState();
  }

  componentDidMount() {
    StockStore.listen((state) => this.onStockStoreChange(state));
  }

  componentWillUnmount() {
    StockStore.unlisten((state) => this.onStockStoreChange(state));
  }

  onStockStoreChange(state) {
    this.setState({
      selectedProperty: state.selectedProperty,
      selectedStock: state.selectedStock,
    });
  }

  changeSelectedStock(stock) {
    console.log('Selected Stock:', stock);
    StockActions.selectStock(stock);
  }

  render() {
    console.log(this.state.selectedStock.symbol,  this.props.stock.symbol, this.state.selectedStock.symbol ===  this.props.stock.symbol);
    return (
      <TouchableHighlight
        style={[this.state.selectedStock.symbol ===  this.props.stock.symbol ? styles.selected : null]}
        onPress={() => this.changeSelectedStock(this.props.stock)} underlayColor="#202020">
        <View style={[styles.container, this.state.selectedStock.symbol ===  this.props.stock.symbol ? styles.selected : null]}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              {this.props.stock.symbol}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].LastTradePriceOnly}
            </Text>
          </View>
          <TouchableHighlight
              style={(() => {
                switch (this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Change && this.props.watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                  case true:                   return styles.changeGreen;
                  case false:                  return styles.changeRed;
                  default:                     return styles.changeGreen;
                }
              })()}
              underlayColor={(() => {
                switch (this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Change && this.props.watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                  case true:                   return '#53D769';
                  case false:                  return '#FC3D39';
                  default:                     return '#53D769';
                }
              })()}
              onPress={() => StockActions.selectProperty(ROTATE_PROPERTIES[this.state.selectedProperty])}>
            <View>
              <Text style={styles.changeText}>
                {(() => {
                  switch (this.state.selectedProperty) {
                    case 'Change':                 return this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Change || '--';
                    case 'ChangeinPercent':        return this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].ChangeinPercent || '--';
                    case 'MarketCapitalization':   return this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].MarketCapitalization || '--';
                    default:                       return this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].Change || '--';
                  }
                })()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
