/* @flow */
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

// Flux
var PropertyActions = require('../../Utils/Property/actions');
var PropertyStore = require('../../Utils/Property/store');
var StockStore = require('../../Utils/Stock/store');

// Elements
var StockCell = require('./Elements/StockCell');

var styles = require('./style');

var SettingsView = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onChangeShowingProperty: function(data: string) {
    this.setState({
      showingProperty: data,
    });
  },

  onUpdateStocks: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  onDeleteStock: function(watchlist: Array<Object>, result: Array<Object>) {
    this._genRows(watchlist, result);
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.listenTo(PropertyStore, this.onChangeShowingProperty);
    this.listenTo(StockStore, this.onDeleteStock);
    this.listenTo(StockStore, this.onUpdateStocks);

    store.get('showingProperty').then((result) => {
      this.setState({
        showingProperty: result,
      });
    });

    store.get('watchlist').then((watchlist) => {
      store.get('watchlistResult').then((result) => {
        this._genRows(watchlist, result);
      });
    });
  },

  _genRows: function(watchlist: Array<Object>, result: Array<Object>) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(watchlist),
      loaded: true,
      watchlistResult: result,
    });
  },

  _renderStockCell: function(stock: Object) {
    return(
      <StockCell stock={stock} watchlistResult={this.state.watchlistResult}/>
    );
  },

  _setShowingProperty: function(value: string) {
    this.setState({
      showingProperty: value,
    });
    store.save('showingProperty', value);
    PropertyActions.changeShowingProperty(value);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderStockCell}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight style={[styles.buttonLeft, this.state.showingProperty === 'ChangeinPercent' ? styles.buttonSelected: null]}
              underlayColor='#66CCFF'
              onPress={() => this._setShowingProperty('ChangeinPercent')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'ChangeinPercent' ? styles.buttonTextSelected: null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonMiddle, this.state.showingProperty === 'Change' ? styles.buttonSelected: null]}
              underlayColor='#66CCFF'
              onPress={() => this._setShowingProperty('Change')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'Change' ? styles.buttonTextSelected: null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonRight, this.state.showingProperty === 'MarketCapitalization' ? styles.buttonSelected: null]}
              underlayColor='#66CCFF'
              onPress={() => this._setShowingProperty('MarketCapitalization')}>
            <Text style={[styles.buttonText, this.state.showingProperty === 'MarketCapitalization' ? styles.buttonTextSelected: null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SettingsView;
