'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  loadingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: '#FF6600'
  },
  stocksListView: {
    flex: 3,
    backgroundColor: '#000000',
  },
  detailedBox: {
    flexDirection: 'row',
    flex: 2,
  },
  topBlock: {
    flexDirection: 'row',
    flex: 2
  },
  bottomBlock: {
    backgroundColor: '#202020',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
  },
  stockName: {
    flex: 1,
  },
  stockNameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  stockDetails: {
    flex: 5,
    flexDirection: 'column',
  },
  stockDetailsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  stockDetailsColumn: {
    flex: 1,
  },
  stockPropertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 4,
    marginRight: 10,
  },
  stockValueText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 10,
    marginRight: 5,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  separatorThin: {
    height: 0.3,
    backgroundColor: '#A6A6A6',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  yahoo: {
    flex: 1,
  },
  yahooText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 4,
  },
  marketTime: {
    flex: 1,
  },
  marketTimeText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 4,
  },
  changeDetailView: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  settings: {
    flex: 1,
  },
  settingsText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 4,
  },
});
