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
var PropertyStore = require('../../Utils/Property/store');
var StockStore = require('../../Utils/Stock/store');

var StockCell = require('./Elements/StockCell');

var styles = require('./style');

var SettingsView = React.createClass({
  mixins: [Reflux.ListenerMixin],

  onChangeShowingProperty: function(data) {
    this.setState({
      showingProperty: data,
    });
  },

  onUpdateStocks: function() {
    this._genRows();
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.listenTo(PropertyStore, this.onChangeShowingProperty);
    this.listenTo(StockStore, this.onUpdateStocks);

    store.get('showingProperty').then((result) => {
      this.setState({
        showingProperty: result,
      });
      this._genRows();
    });
  },

  _genRows() {
    var that = this;
    store.get('watchlist').then((result) => {
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(result),
        loaded: true,
      });
    });
  },

  renderStockCell: function(stock) {
    return(
      <StockCell stock={stock}/>
    );
  },

  setShowingProperty: function(value) {
    this.setState({
      showingProperty: value,
    });
    store.save('showingProperty', value);
    Actions.changeShowingProperty(value);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderStockCell}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight style={this.state.showingProperty === 'ChangeinPercent' ? styles.buttonLeftSelected: styles.buttonLeft}
              underlayColor='#66CCFF'
              onPress={() => this.setShowingProperty('ChangeinPercent')}>
            <Text style={this.state.showingProperty === 'ChangeinPercent' ? styles.buttonTextSelected: styles.buttonText}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={this.state.showingProperty === 'Change' ? styles.buttonMiddleSelected: styles.buttonMiddle}
              underlayColor='#66CCFF'
              onPress={() => this.setShowingProperty('Change')}>
            <Text style={this.state.showingProperty === 'Change' ? styles.buttonTextSelected: styles.buttonText}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={this.state.showingProperty === 'MarketCapitalization' ? styles.buttonRightSelected: styles.buttonRight}
              underlayColor='#66CCFF'
              onPress={() => this.setShowingProperty('MarketCapitalization')}>
            <Text style={this.state.showingProperty === 'MarketCapitalization' ? styles.buttonTextSelected: styles.buttonText}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SettingsView;
