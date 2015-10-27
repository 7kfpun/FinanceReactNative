/* @flow */
'use strict';

var React = require('react-native');

var {
  ListView,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} = React;

// Elements
var StockCell = require('./Elements/StockCell');

// Utils
var finance = require('../../Utils/finance');

var styles = require('./style');

var AddNewView = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      text: null,
      helpText: 'Type a company name or stock symbol.',
    };
  },

  _onTyping: function(text: Object) {
    this.setState({
      text: text.text,
      helpText: 'Validating symbol...',
    });

    var that = this;
    finance.symbolSuggest(text.text)
      .then(function(response) {
        var result = response.text();
        result = result._12.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        return JSON.parse(result);
      }).then(function(json) {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(json.ResultSet.Result),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
      }).catch((error) => {
        console.log('Request failed', error);
      });
  },

  renderStockCell: function(stock: Object) {
    return(
      <StockCell
        stock={stock}
        navigator={this.props.navigator}
        watchlistCache={this.state.watchlistCache}
      />
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>
          {this.state.helpText}
        </Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarInput}
            autoCapitalize={'characters'}
            autoFocus={true}
            placeholder='symbol..'
            placeholderTextColor='gray'
            onChangeText={(text) => this._onTyping({text})}
            value={this.state.text}
          />
          <TouchableHighlight style={styles.cancelButton}
  		    	underlayColor='black'
  		    	onPress={() => this.props.navigator.pop()}>
  		    	<Text style={styles.cancelButtonText}>
  		    		Cancel
  		    	</Text>
  		  	</TouchableHighlight>
        </View>
        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderStockCell}
          />
        </View>
      </View>
    );
  }
});

module.exports = AddNewView;
