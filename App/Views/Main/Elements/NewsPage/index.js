/* @flow */
'use strict';

import React, {
  Text,
  View,
} from 'react-native';

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
