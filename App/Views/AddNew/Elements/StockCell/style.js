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
  },
  element: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: 'black',
  },
  delete: {
    flex: 1,
  },
  deleteText: {
    fontSize: 15,
    color: '#FC3D39',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  stock: {
    flex: 8,
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
  moveText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  separator: {
    height: 1.5 / PixelRatio.get(),
    backgroundColor: '#CCCCCC',
  },
});
