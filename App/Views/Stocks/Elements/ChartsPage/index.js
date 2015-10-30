/* @flow */
'use strict';

var React = require('react-native');

var {
  Image,
  Text,
  TouchableHighlight,
  View,
} = React;

// Styles
var styles = require('./style');

var ChartsPage = React.createClass({

  getInitialState: function() {
    return {
      timeSpan: '1D',
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.timeSpanGroup}>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1D'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '1D') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>1D</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '5D'})}
            underlayColor='#202020'>
          <Text style={(() => {
            switch (this.state.timeSpan === '5D') {
              case true:                   return styles.timeSpanSelectedText;
              case false:                  return styles.timeSpanText;
              default:                     return styles.timeSpanText;
            }
          })()}>1W</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '1M') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>1M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '3M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '3M') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>3M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '6M'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '6M') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>6M</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '1Y'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '1Y') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>1Y</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.timeSpan}
            onPress={() => this.setState({timeSpan: '2Y'})}
            underlayColor='#202020'>
            <Text style={(() => {
              switch (this.state.timeSpan === '2Y') {
                case true:                   return styles.timeSpanSelectedText;
                case false:                  return styles.timeSpanText;
                default:                     return styles.timeSpanText;
              }
            })()}>2Y</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chart}>
        <Image
          style={styles.image}
          source={{uri: 'http://chart.finance.yahoo.com/z?s=' + this.props.stock.symbol + '&t=' + this.state.timeSpan.toLowerCase() + '&random=' + new Date().getTime()}} />
        </View>
      </View>
    );
  }
});

module.exports = ChartsPage;
