'use strict';

var React = require('react-native');
var store = require('react-native-simple-store');


var {
  Text,
  TouchableHighlight,
  View,
  ListView,
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
    this._genRows();
  },

  _genRows() {
    var that = this;
    store.get('watchlist').then((result) => {
      this.setState({
        dataSource: that.state.dataSource.cloneWithRows(result),
        loaded: true,
      });
    });
  },

  renderStockCell: function(stock) {
    return(
      <StockCell
        onSelect={() => this.selectStock(stock)}
        stock={stock}/>
    );
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
          <TouchableHighlight style={styles.button}
              underlayColor='#66CCFF'
              onPress={this._onPressSaveButton}>
            <View backgroundColor='#ED6063'>
              <Text style={styles.buttonText}>
                percentage
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
              underlayColor='#66CCFF'
              onPress={this._onPressSaveButton}>
            <Text style={styles.buttonText}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
              underlayColor='#66CCFF'
              onPress={this._onPressSaveButton}>
            <Text style={styles.buttonText}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SettingsView;
