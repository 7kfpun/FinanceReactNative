'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
  },
  stockElement: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'black',
  },
  stockDelete: {
    flex: 1,
  },
  stockDeleteText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  stockSymbol: {
    flex: 8,
  },
  stockSymbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  stockMove: {
    flex: 1,
  },
  stockMoveText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
});
