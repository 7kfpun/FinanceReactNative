'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
  head: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  foot: {
    flex: 2
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  source: {
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  loadingText: {
    color: '#FF6600',
    marginTop: 5,
    fontSize: 15,
  },
});
