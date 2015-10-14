'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');

var {
  ListView,
  Text,
  TouchableHighlight,
  View,
} = React;

var StockCell = require('./Elements/StockCell');

var styles = require('./style');

var SettingsView = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    var that = this;
    store.get('showingProperty').then((result) => {
      that.setState({
        showingProperty: result,
      });
      that._genRows();
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
      <StockCell
        onRefreshSettingsView={() => this._genRows()}
        stock={stock}/>
    );
  },

  setShowingProperty: function(value) {
    this.setState({
      showingProperty: value,
    });
    store.save('showingProperty', value);
  },

  render: function() {
    console.log('this.state.showingProperty', this.state.showingProperty);
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
