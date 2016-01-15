/* @flow */
'use strict';

import React, {
  ListView,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';

// Elements
import StockCell from './Elements/StockCell';

// Utils
import finance from '../../Utils/finance';

// Styles
import styles from './style';

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
      .then((response) => response.text())
      .then((result) => {
        result = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        console.log(result);
        return JSON.parse(result);
      }).then((json) => {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(json.ResultSet.Result),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
      }).catch((error) => {
        console.log('Request failed', error);
      });
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
            placeholder="symbol.."
            placeholderTextColor="gray"
            onChangeText={(text) => this._onTyping({text})}
            value={this.state.text}
          />
          <TouchableHighlight style={styles.cancelButton}
            underlayColor="black"
            onPress={() => Actions.pop()}>
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(stock) => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} />}
          />
        </View>
      </View>
    );
  }
});

module.exports = AddNewView;
