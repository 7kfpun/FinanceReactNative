'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');

var {
  ListView,
  Text,
  TouchableHighlight,
  View,
} = React;

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
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      selectedStock: {},
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(responseData),
    //   loaded: true
    // });

    var that = this;
    store.get('watchlist').then((result) => {
      if (!Array.isArray(result) || result === []) {
        result = [
          {symbol: 'AAPL', share: 100},
          {symbol: 'GOOG', share: 100},
          {symbol: '0001.HK', share: 100},
          {symbol: '0002.HK', share: 100},
          {symbol: '0011.HK', share: 100},
          {symbol: '1211.HK', share: 100}
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
          console.log('>>', json);
          var quotes = json.query.results.quote;
          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(quotes),
            watchlist: result,
            loaded: true,
            selectedStock: quotes[0],
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
          <ListView
            dataSource={this.state.dataSource}
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
                underlayColor='#4D4D4D'>
              <Text style={styles.yahooText}>
                Yahoo!
              </Text>
            </TouchableHighlight>
            <View style={styles.marketTime}>
              <Text style={styles.marketTimeText}>
                Market closed
              </Text>
            </View>
            <TouchableHighlight
                style={styles.settings}
                onPress={() => this.openPage()}
                underlayColor='#4D4D4D'>
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
        stock={stock}/>
    );
  },

  _onPressCancelButton: function() {
    this.props.navigator.pop();
  },

  _onPressEditButton: function(stock) {
    this.props.navigator.push({
      title: 'Edit',
      component: EditView,
      passProps: {
        stock: stock,
      },
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: this._onPressCancelButton,
    })
  },

  selectStock: function(stock) {
    // console.log('selectStock', stock);
    this.setState({
      selectedStock: stock,
    });
    // this.props.navigator.push({
    //   title: stock.name,
    //   component: StockView,
    //   passProps: {
    //     stock: stock,
    //   },
    //   rightButtonTitle: 'Edit',
    //   onRightButtonPress: () => this._onPressEditButton(stock.symbol),
    // });
  },

  openPage: function() {
    console.log('Click on yahoo!');
    this.props.navigator.push({
      title: this.props.stock_title,
      component: WebView,
      passProps: {url: 'http://finance.yahoo.com/q?s=' + this.state.selectedStock.symbol},
    });
  },

});
module.exports = ViewReactClass;
