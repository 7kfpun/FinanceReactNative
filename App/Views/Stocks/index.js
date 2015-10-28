/* @flow */
'use strict';

var React = require('react-native');
var Reflux = require('reflux');

var {
  Image,
  ListView,
  Platform,
  Platform,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
  ViewPagerAndroid,
} = React;

// 3rd Elements
var RefreshableListView = require('react-native-refreshable-listview')
var ViewPager = require('react-native-viewpager');

// Flux
var StockActions = require('../../Utils/Stock/actions');
var StockStore = require('../../Utils/Stock/store');

// View Elements
var StockCell = require('./Elements/StockCell');

// Styles
var styles = require('./style');

var ViewReactClass = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onUpdateStocks: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  onDeleteStock: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  getInitialState: function() {
    var viewPagerDataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});

    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      chartTimeSpan: '1D',
      dataSourcePage: viewPagerDataSource.cloneWithPages(['DETAILS', 'CHARTS', 'NEWS']),
    };
  },

  componentDidMount: function() {
    this.listenTo(StockStore, this.onDeleteStock);
    this.listenTo(StockStore, this.onUpdateStocks);

    StockActions.updateStocks();
  },

  _genRows: function(watchlist: Array<Object>, result: Array<Object>) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(watchlist),
      loaded: true,
      selectedStock: this.state.selectedStock || watchlist[0],
      watchlistResult: result,
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

  renderViewPagerAndroid: function() {
    return (
      <ViewPagerAndroid
        style={{flex: 1}}
        initialPage={0}>
        {this.renderDetails()}
        {this.renderCharts()}
        {this.renderNews()}
      </ViewPagerAndroid>
    );
  },

  renderViewPagerIOS: function() {
    return (
      <ViewPager
        dataSource={this.state.dataSourcePage}
        renderPage={this._renderPage}
        onChangePage={this._onChangePage}
        isLoop={true}
        autoPlay={false} />
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
            style={styles.stocksListView} />
        </View>
        <View style={styles.middleBlock}>
          {(() => {
            switch (Platform.OS) {
              case 'ios':                   return this.renderViewPagerIOS();
              case 'android':               return this.renderViewPagerAndroid();
              default:                      return this.renderViewPagerIOS();
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

  _renderPage: function(data: Object, pageID: number | string) {
    return (
      <View style={styles.middleBlock}>
        {(() => {
          switch (data) {
            case 'DETAILS':              return this.renderDetails();
            case 'CHARTS':               return this.renderCharts();
            case 'NEWS':                 return this.renderNews();
            default:                     return this.renderDetails();
          }
        })()}
      </View>
    );
  },

  _onChangePage: function(page: number | string) {
    console.log('Change page.');
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

  renderCharts: function() {
    return (
      <View style={styles.chartBlock}>
        <View style={styles.chartTimeSpanGroup}>
          <TouchableHighlight
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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
            style={styles.chartTimeSpan}
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

  renderStockCell: function(stock: Object) {
    return (
      <StockCell
        onSelect={() => this.selectStock(stock)}
        stock={stock}/>
    );
  },

  selectStock: function(stock: Object) {
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
    } else if (Platform.OS === 'android') {
      ToastAndroid.show('WebView is not working for Android App.', ToastAndroid.SHORT);
    }
  },
});

module.exports = ViewReactClass;
