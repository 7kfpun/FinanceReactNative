'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var store = require('react-native-simple-store');

var {
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  View,
  Image,
} = React;

var RefreshableListView = require('react-native-refreshable-listview')

// Flux
var StockActions = require('../../Utils/Stock/actions');
var StockStore = require('../../Utils/Stock/store');

// View Elements
var StockCell = require('./Elements/StockCell');

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
      middleBlockShowing: 'DETAILS',
      chartTimeSpan: '1D',
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
        <View style={styles.stocksBlock}>
          <RefreshableListView
            dataSource={this.state.dataSource}
            loadData={() => StockActions.updateStocks()}
            renderRow={this.renderStockCell}
            style={styles.stocksListView}/>
        </View>
        <View style={styles.middleBlock}>
          {(() => {
            switch (this.state.middleBlockShowing) {
              case 'DETAILS':              return this.renderDetails();
              case 'CHART':                return this.renderChart();
              case 'NEWS':                return this.renderNews();
              default:                     return this.renderDetails();
            }
          })()}
        </View>
        <View style={styles.footerBlock}>
          <TouchableHighlight
            style={styles.yahoo}
            onPress={() => this.openPage()}
            underlayColor='#202020'>
            <Text style={styles.yahooText}>
              Yahoo!
            </Text>
          </TouchableHighlight>
          <View style={styles.footerMiddle}>
            <View style={styles.changeSlide}>
              <TouchableHighlight
                onPress={() => this.setState({middleBlockShowing: 'DETAILS'})}
                underlayColor='#202020'>
                <Text style={styles.changeDetailView}>
                  ●
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setState({middleBlockShowing: 'CHART'})}
                underlayColor='#202020'>
                <Text style={styles.changeDetailView}>
                  ●
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.setState({middleBlockShowing: 'NEWS'})}
                underlayColor='#202020'>
                <Text style={styles.changeDetailView}>
                  ●
                </Text>
              </TouchableHighlight>
            </View>
            <Text style={styles.marketTimeText}>
              Market closed
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

  renderDetails: function() {
    return (
      <View style={styles.detailsBlock}>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Name || '--'}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                OPEN
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Open || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                MKT CAP
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].MarketCapitalization || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                HIGH
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysHigh || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W HIGH
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearHigh || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                LOW
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DaysLow || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                52W LOW
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].YearLow || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                VOL
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].Volume || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                AVG VOL
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].AverageDailyVolume || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin}/>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                P/E
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].PERatio || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                YIELD
              </Text>
              <Text style={styles.valueText}>
                {this.state.watchlistResult && this.state.watchlistResult[this.state.selectedStock.symbol] && this.state.watchlistResult[this.state.selectedStock.symbol].DividendYield || '--'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  },

  renderChart: function() {
    return (
      <View style={styles.chartBlock}>
        <View style={styles.chartTimeSpan}>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '1D'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '1D') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>1D</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '5D'})}
            underlayColor='#202020'>
          <Text style={(() => {
            switch (this.state.chartTimeSpan === '5D') {
              case true:                   return styles.chartTimeSpanSelectedText;
              case false:                  return styles.chartTimeSpanText;
              default:                     return styles.chartTimeSpanText;
            }
          })()}>1W</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '1M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '1M') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>1M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '3M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '3M') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>3M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '6M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '6M') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>6M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '1Y'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '1Y') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>1Y</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({chartTimeSpan: '2Y'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.chartTimeSpan === '2Y') {
                case true:                   return styles.chartTimeSpanSelectedText;
                case false:                  return styles.chartTimeSpanText;
                default:                     return styles.chartTimeSpanText;
              }
            })()}>2Y</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chart}>
        <Image style={styles.image} source={{uri: 'http://chart.finance.yahoo.com/z?s=' + this.state.selectedStock.symbol + '&t=' + this.state.chartTimeSpan.toLowerCase()}} />
        </View>
      </View>
    );
  },

  renderNews: function() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>
          Under construction
        </Text>
      </View>
    );
  },

  renderStockCell: function(stock) {
    return (
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
