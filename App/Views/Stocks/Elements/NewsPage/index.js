/* @flow */
'use strict';

var React = require('react-native');

var {
  Text,
  View,
} = React;

var NewsPage = React.createClass({
  render: function() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>
          Under construction (Stock: {this.props.stock.symbol})
        </Text>
      </View>
    );
  },
});

module.exports = NewsPage;
