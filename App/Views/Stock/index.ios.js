'use strict';

var React = require('react-native');

var {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

// Utils
var finance = require('../../Utils/finance');
var UtilFuncs = require('../../Utils/functions');

//Views
var WebView = require('../Web');

// Styles
var styles = require('./style');

var Stock = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      comments: [],
      commentsLoaded: false,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.setState({
      loaded: true
    });
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this.renderCommentsHeader}
        style={styles.commentListView}/>
    );
  },

  renderCommentsHeader: function() {
    if (!this.state.loaded) {
      return(
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.title}>
              {this.props.stock.symbol} {this.props.stock.Name} {this.props.stock.Currency}
            </Text>
            <TouchableHighlight
                onPress={() => this.openPage()}
                underlayColor='#F6F6EF'>
              <Text style={styles.source}>
                (Yahoo finance)
              </Text>
            </TouchableHighlight>
            <View style={styles.separator}/>
            <Text style={styles.commentTitle}>Updated time {this.props.stock.LastTradeDate} {this.props.stock.LastTradeTime}</Text>
          </View>
        </View>
      );
    }

    var stock = this.props.stock;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.stock.symbol} {this.props.stock.Name} {this.props.stock.Currency}
          </Text>
          <TouchableHighlight
              onPress={() => this.openPage()}
              underlayColor='#F6F6EF'>
            <Text style={styles.source}>
              (Yahoo finance)
            </Text>
          </TouchableHighlight>
          {finance.properties.map(function(property) {
            if (stock[property]) {
              return <Text style={styles.text}>{property}  {stock[property]}</Text>;
            }
          })}
          <View style={styles.separator}/>
          <Text style={styles.commentTitle}>Updated time {this.props.stock.LastTradeDate} {this.props.stock.LastTradeTime}</Text>
        </View>
      </View>
    );
  },

  openPage: function() {
    this.props.navigator.push({
      title: this.props.stock_title,
      component: WebView,
      passProps: {url: 'http://finance.yahoo.com/q?s=' + this.props.stock.symbol},
    });
  },
});

module.exports = Stock;
