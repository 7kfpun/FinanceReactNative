/* @flow */
'use strict';

var React = require('react-native');
var {
  View,
  WebView,
} = React;

// Styles
var styles = require('./style');

var WebClass = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.route.url}/>
      </View>
    );
  }
});

module.exports = WebClass;
