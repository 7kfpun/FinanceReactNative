'use strict';

var React = require('react-native');

var {
  PixelRatio,
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
  element: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  delete: {
    flex: 1,
  },
  stock: {
    flex: 7,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  move: {
    flex: 1,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#CCCCCC',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
