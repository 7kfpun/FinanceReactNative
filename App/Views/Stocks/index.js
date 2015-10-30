/* @flow */
'use strict';

var React = require('react-native');
var Reflux = require('reflux');

var {
  Image,
  ListView,
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
var ChartsPage = require('./Elements/ChartsPage');
var DetailsPage = require('./Elements/DetailsPage');
var NewsPage = require('./Elements/NewsPage');

// Styles
var styles = require('./style');

var ViewReactClass = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onUpdateStocks: function(watchlist: Array<Object>, result: Array<Object>) {
    this.updateRows(watchlist, result);
  },

  onDeleteStock: function(watchlist: Array<Object>, result: Array<Object>) {
    this.updateRows(watchlist, result);
  },

  getInitialState: function() {
    var viewPagerDataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});

    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      dataSourcePage: viewPagerDataSource.cloneWithPages(['DETAILS', 'CHARTS', 'NEWS']),
    };
  },

  componentDidMount: function() {
    this.listenTo(StockStore, this.onUpdateStocks);
    this.listenTo(StockStore, this.onDeleteStock);

    StockActions.updateStocks();
  },

  updateRows: function(watchlist: Array<Object>, result: Array<Object>) {
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
              <Image style={styles.icon} source={require('image!ic_three_lines_white')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  renderStockCell: function(stock: Object) {
    return (
      <StockCell
        onSelect={() => this._selectStock(stock)}
        stock={stock}/>
    );
  },

  _selectStock: function(stock: Object) {
    this.setState({
      selectedStock: stock,
    });
  },

  renderViewPagerAndroid: function() {
    return (
      <ViewPagerAndroid
        style={{flex: 1}}
        initialPage={0}>
        <View>
          <DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />
        </View>
        <View>
          <ChartsPage stock={this.state.selectedStock} />
        </View>
        <View>
          <NewsPage stock={this.state.selectedStock} />
        </View>
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

  _renderPage: function(data: Object, pageID: number | string) {
    return (
      <View style={{flex: 1}}>
        {(() => {
          switch (data) {
            case 'DETAILS':              return <DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />;
            case 'CHARTS':               return <ChartsPage stock={this.state.selectedStock} />;
            case 'NEWS':                 return <NewsPage stock={this.state.selectedStock} />;
            default:                     return <NewsPage stock={this.state.selectedStock} />;;
          }
        })()}
      </View>
    );
  },

  _onChangePage: function(page: number | string) {
    console.log('Change page.');
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
