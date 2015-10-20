'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');
var Swiper = require('react-native-swiper');

var {
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  View,
  Image,
} = React;

var {
  RefresherListView,
} = require('react-native-refresher');

// Flux
var StockActions = require('../../Utils/Stock/actions');
var StockStore = require('../../Utils/Stock/store');

// View Elements
var StockCell = require('./Elements/StockCell');

// Views
var WebView = require('../Web');

// Styles
var styles = require('./style');

var ViewReactClass = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onUpdateStocks: function(result) {
    this._genRows(result);
  },

  onDeleteStock: function(result) {
    this._genRows(result);
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.listenTo(StockStore, this.onDeleteStock);
    this.listenTo(StockStore, this.onUpdateStocks);

    StockActions.updateStocks();
  },

  _genRows: function(result) {
    var that = this;
    store.get('watchlist').then((result) => {
      this.setState({
        dataSource: that.state.dataSource.cloneWithRows(result),
        loaded: true,
        selectedStock: that.state.selectedStock || result[0],
      });
    });

    store.get('watchlistResult').then((result) => {
      this.setState({
        watchlistResult: result,
      });
    });
  },

  render: function() {
    if(!this.state.loaded){
      return(
        <View style={styles.container}>
          <Text style={styles.loadingText}>
            Loading...
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
            onRefresh={this._genRows}
            renderRow={this.renderStockCell}
            style={styles.stocksListView}/>
        </View>

        <View>
          <Swiper height={240} horizontal={false} autoplay={false}>
            <View style={styles.slide1}>
              {this.renderStockDetails()}
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
      </View>
    );
  },

  renderStockDetails: function() {
    return (
      <View style={styles.bottomBlock}>
        <View style={styles.name}>
          <Text style={styles.nameText}>
            {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Name}
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
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Open}
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockPropertyText}>
                MKT CAP
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockValueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].MarketCapitalization}
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
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysHigh}
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockPropertyText}>
                52W HIGH
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockValueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearHigh}
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
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysLow}
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockPropertyText}>
                52W LOW
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockValueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearLow}
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
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Volume}
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockPropertyText}>
                AVG VOL
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockValueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].AverageDailyVolume}
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
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].PERatio}
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockPropertyText}>
                YIELD
              </Text>
            </View>
            <View style={styles.stockDetailsColumn}>
              <Text style={styles.stockValueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DividendYield}
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
    );
  },

  renderListViewBack: function() {
    return(
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <RefresherListView
            dataSource={this.state.dataSource}
            onRefresh={this._genRows}
            renderRow={this.renderStockCell}
            style={styles.stocksListView}/>
        </View>

        <View style={styles.bottomBlock}>
          <View style={styles.name}>
            <Text style={styles.nameText}>
              {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Name}
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
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Open}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  MKT CAP
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].MarketCapitalization}
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
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysHigh}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  52W HIGH
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearHigh}
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
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysLow}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  52W LOW
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearLow}
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
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Volume}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  AVG VOL
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].AverageDailyVolume}
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
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].PERatio}
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockPropertyText}>
                  YIELD
                </Text>
              </View>
              <View style={styles.stockDetailsColumn}>
                <Text style={styles.stockValueText}>
                  {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DividendYield}
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
        stock={stock}/>
    );
  },

  selectStock: function(stock) {
    this.setState({
      selectedStock: stock,
    });
  },

  pushSettingsView: function() {
    this.props.navigator.push({title: 'Stocks', id: 'settings'});
  },

  openPage: function() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: 'Yahoo',
        id: 'yahoo',
        url: 'http://finance.yahoo.com/q?s=' + this.state.selectedStock.symbol,
      });
    }
  },
});

module.exports = ViewReactClass;
