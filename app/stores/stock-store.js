import alt from '../alt';

// Flux
import StockActions from '../actions/stock-action';

// 3rd party libraries
import store from 'react-native-simple-store';

// Utils
import UtilFuncs from '../utils/functions';
import finance from '../utils/finance';

class StockStore {
  constructor() {
    let that = this;
    store.get('watchlist').then((watchlist) => {
      store.get('watchlistResult').then((watchlistResult) => {
        console.log('From store watchlist:', watchlist);
        if (!watchlist || !Array.isArray(watchlist)) {
          watchlist = [
            {symbol: 'AAPL', share: 100},
            {symbol: 'GOOG', share: 100},
          ];
          store.save('watchlist', watchlist);
        }
        that.setState({
          watchlist: watchlist,
          watchlistResult: watchlistResult,
          selectedStock: watchlist.length > 0 ? watchlist[0] : {},
        });
        that.handleUpdateStocks();
      });
    });

    this.bindListeners({
      handleUpdateStocks: StockActions.UPDATE_STOCKS,
      handleAddStock: StockActions.ADD_STOCK,
      handleDeleteStock: StockActions.DELETE_STOCK,
      handleSelectStock: StockActions.SELECT_STOCK,
      handleSelectProperty: StockActions.SELECT_PROPERTY,
    });

    this.state = {
      watchlist: [],
      watchlistResult: {},
      selectedStock: {},
      selectedProperty: 'ChangeinPercent',
    };
  }

  handleUpdateStocks() {
    let symbols = this.state.watchlist.map((item) => item.symbol.toUpperCase());

    let that = this;
    finance.getStock({stock: symbols}, 'quotes')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        var quotes = json.query.results.quote;
        quotes = Array.isArray(quotes) ? quotes : [quotes];

        var watchlistResult = {};
        quotes.forEach((quote) => {
          watchlistResult[quote.symbol] = quote;
        });
        store.save('watchlistResult', watchlistResult);
        that.setState({watchlistResult: watchlistResult});
      }).catch((error) => {
        console.log('Request failed', error);
        store.get('watchlistResult').then((watchlistResult) => {
          that.setState({watchlistResult: watchlistResult});
        });
      });
  }

  handleAddStock(symbol) {
    console.log('handleAddStock', symbol);
    let watchlist = this.state.watchlist;
    let addedStock = {symbol: symbol.toUpperCase(), share: 100};
    watchlist.push(addedStock);
    this.setState({watchlist: watchlist});
    store.save('watchlist', watchlist);
    this.handleUpdateStocks();

    if (watchlist.length === 1) {
      this.setState({selectedStock: addedStock});
    }
  }

  handleDeleteStock(symbol) {
    console.log('handleDeleteStock', symbol);
    let watchlist = UtilFuncs.removeObjectfromArray(this.state.watchlist, 'symbol', symbol);
    this.setState({watchlist: watchlist});
    store.save('watchlist', watchlist);

    if (watchlist.length === 0) {
      this.setState({selectedStock: {}});
    }
  }

  handleSelectStock(stock) {
    console.log('handleSelectStock', stock);
    this.setState({selectedStock: stock});
  }

  handleSelectProperty(property) {
    console.log('handleSelectProperty', property);
    this.setState({selectedProperty: property});
  }
}

module.exports = alt.createStore(StockStore, 'StockStore');
