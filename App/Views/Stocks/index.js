'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');

var {
  ListView,
  Text,
  TouchableHighlight,
  View,
} = React;

var {
  RefresherListView,
} = require('react-native-refresher');

// Flux
var StockStore = require('../../Utils/Stock/store');

// Utils
var finance = require('../../Utils/finance');
var UtilFuncs = require('../../Utils/functions');

// View Elements
var StockCell = require('./Elements/StockCell');

// Views
var EditView = require('../Edit');
var StockView = require('../Stock');
var WebView = require('../Web');

// Styles
var styles = require('./style');

var ViewReactClass = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onUpdateStocks: function() {
    this.fetchData();
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.listenTo(StockStore, this.onUpdateStocks);

    this.fetchData();
  },

  fetchData: function() {
    var that = this;
    store.get('watchlist').then((result) => {
      if (!Array.isArray(result) || result.length === 0) {
        result = [
          {symbol: 'AAPL', share: 100},
          {symbol: 'GOOG', share: 100},
        ];
        store.save('watchlist', result);
      }

      var symbols = [];
      for (var i=0; i < result.length; i++) {
        symbols.push(result[i].symbol);
      }

      finance.getStock({stock: symbols}, 'quotes')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          var quotes = json.query.results.quote ;
          quotes = Array.isArray(quotes) ? quotes : [quotes];

          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(quotes),
            watchlist: result,
            loaded: true,
            selectedStock: that.state.selectedStock || quotes[0],
          });

          // Caching
          var watchlistCache = {};
          quotes.forEach(function (quote) {
            watchlistCache[quote.symbol] = quote;
          });
          store.save('watchlistCache', watchlistCache);

        }).done();
    });
  },

  render: function() {
    if(!this.state.loaded){
      return(
        <View style={styles.container}>
          <Text style={styles.loadingText}>
            Fetching watchlist...
          </Text>
        </View>
      );
    }
    return (
      this.renderListView()
    );
  },

  renderListView: function() {
    return(
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <RefresherListView
            dataSource={this.state.dataSource}
            onRefresh={this.refreshPage}
            renderRow={this.renderStockCell}
            style={styles.stocksListView}/>
        </View>

        <View style={styles.bottomBlock}>
          <View style={styles.stockName}>
            <Text style={styles.stockNameText}>
              {this.state.selectedStock.Name}
            </Text>
          </View>
          <View style={styles.separator}/>
          <View style={styles.stockDetails}>
            <View style={styles.stockDetailsRow}>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  OPEN
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.Open}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  MKT CAP
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.MarketCapitalization}
                </Text>
              </View>
            </View>
            <View style={styles.separatorThin}/>

            <View style={styles.stockDetailsRow}>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  HIGH
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.DaysHigh}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  52W HIGH
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.YearHigh}
                </Text>
              </View>
            </View>
            <View style={styles.separatorThin}/>

            <View style={styles.stockDetailsRow}>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  LOW
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.DaysLow}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  52W LOW
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.YearLow}
                </Text>
              </View>
            </View>
            <View style={styles.separatorThin}/>

            <View style={styles.stockDetailsRow}>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  VOL
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.Volume}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  AVG VOL
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.AverageDailyVolume}
                </Text>
              </View>
            </View>
            <View style={styles.separatorThin}/>

            <View style={styles.stockDetailsRow}>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  P/E
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.PERatio}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  YIELD
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.selectedStock.DividendYield}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.separator}/>

          <View style={styles.footer}>
            <TouchableHighlight
                style={styles.yahoo}
                onPress={() => this.openPage()}
                underlayColor='#202020'>
              <Text style={styles.yahooText}>
                Yahoo!
              </Text>
            </TouchableHighlight>
            <View
                style={styles.marketTime}
                underlayColor='#202020'>
              <Text style={styles.marketTimeText}>
                Market closed
              </Text>
              <Text style={styles.changeDetailView}>
                . . .
              </Text>
            </View>
            <TouchableHighlight
                style={styles.settings}
                onPress={() => this.pushSettingsView()}
                underlayColor='#202020'>
              <Text style={styles.settingsText}>
                ☰
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },

  renderStockCell: function(stock) {
    return(
      <StockCell
        onSelect={() => this.selectStock(stock)}
        onRefreshStocksView={this.refreshPage}
        stock={stock}/>
    );
  },

  _onPressCancelButton: function() {
    this.props.navigator.pop();
  },

  selectStock: function(stock) {
    this.setState({
      selectedStock: stock,
    });
  },

  refreshPage: function() {
    console.log('refreshPage');
    this.fetchData();
  },

  pushSettingsView: function() {
    this.props.navigator.push({title: 'Stocks', id: 'settings'});
    // this.props.pushSettingsView();
  },

  openPage: function() {
    this.props.navigator.push({
      title: 'Yahoo',
      id: 'yahoo',
      url: 'http://finance.yahoo.com/q?s=' + this.state.selectedStock.symbol,
    });
  },
});

module.exports = ViewReactClass;
