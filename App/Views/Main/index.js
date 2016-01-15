/* @flow */
'use strict';

import React, {
  ListView,
  Platform,
  PullToRefreshViewAndroid,
  Text,
  TouchableHighlight,
  View,
  ViewPagerAndroid,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RefreshableListView from 'react-native-refreshable-listview';
import ViewPager from 'react-native-viewpager';

// Flux
import Reflux from 'reflux';
import StockActions from '../../Utils/Stock/actions';
import StockStore from '../../Utils/Stock/store';

// View Elements
import StockCell from './Elements/StockCell';
import ChartsPage from './Elements/ChartsPage';
import DetailsPage from './Elements/DetailsPage';
import NewsPage from './Elements/NewsPage';

// Styles
import styles from './style';

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
    console.log('updateRows', this.state.loaded);
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      this.renderListView()
    );
  },

  renderListView: function() {
    return (
      <View style={styles.container}>
        <View style={styles.stocksBlock}>
          {(() => {
            switch (Platform.OS) {
              case 'ios':       return <RefreshableListView
                                          dataSource={this.state.dataSource}
                                          loadData={() => StockActions.updateStocks()}
                                          renderRow={(stock) => <StockCell onSelect={() => this.setState({selectedStock: stock})} stock={stock}/>}
                                        />;
              case 'android':   return <PullToRefreshViewAndroid
                                          onRefresh={() => StockActions.updateStocks()}>
                                          <ListView
                                            dataSource={this.state.dataSource}
                                            renderRow={(stock) => <StockCell onSelect={() => this.setState({selectedStock: stock})} stock={stock}/>}
                                          />
                                        </PullToRefreshViewAndroid>;
              default:          return null;
            }
          })()}
        </View>
        <View style={styles.detailedBlock}>
          {(() => {
            switch (Platform.OS) {
              case 'ios':       return this.renderViewPagerIOS();
              case 'android':   return this.renderViewPagerAndroid();
              default:          return null;
            }
          })()}
        </View>
        <View style={styles.footerBlock}>
          <TouchableHighlight
            style={styles.yahoo}
            onPress={() => this.openPage()}
            underlayColor="#202020">
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
            underlayColor="#202020">
            <Icon name="menu" color="white" size={22} />
          </TouchableHighlight>
        </View>
      </View>
    );
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
        isLoop={true}
        autoPlay={false} />
    );
  },

  _renderPage: function(data: Object, pageID: number | string) {
    return (
      <View style={{flex: 1}}>
        {(() => {
          switch (data) {
            case 'DETAILS':     return <DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />;
            case 'CHARTS':      return <ChartsPage stock={this.state.selectedStock} />;
            case 'NEWS':        return <NewsPage stock={this.state.selectedStock} />;
            default:            return <NewsPage stock={this.state.selectedStock} />;
          }
        })()}
      </View>
    );
  },

  pushSettingsView: function() {
    Actions.settings();
  },

  openPage: function() {
    Actions.web({url: 'http://finance.yahoo.com/q?s=' + this.state.selectedStock.symbol});
  },
});

module.exports = ViewReactClass;
